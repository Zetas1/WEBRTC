import React, { useContext, useEffect, useState } from 'react';
import PeerConnection from 'rtcpeerconnection';
import PropTypes from 'prop-types';

import {
	StyledVideoTrickWrapper,
	StyledLocalVideoWrapper,
	StyledVideo,
	StyledRemoteVideoWrapper
} from './styles';
import { PeerConnectionFrom } from './PeerConnectionFrom/PeerConnectionFrom';
import { PeerConnectionTo } from './PeerConnectionTo/PeerConnectionTo';
import { VideoButtons } from './VideoButtons/VideoButtons';
import { peerConnectionConfig } from './PeerConnectionFrom/constants';
import { Call } from './Call/Call';
import { SocketContext } from '../../index';
import { ModalContext } from '../Common/Modal/Modal';
import { RejectCall } from './RejectCall/RejectCall';
import { UserContext } from '../App/App';

const toggleAudio = (localStream) => {
	if (localStream !== null) {
		const audioTracks = localStream.getAudioTracks();

		audioTracks[0].enabled = !audioTracks[0].enabled;
	}
};

const toggleVideo = (localStream) => {
	if (localStream !== null) {
		const videoTracks = localStream.getVideoTracks();

		videoTracks[0].enabled = !videoTracks[0].enabled;
	}
};

export const Video = ({ companionId }) => {
	const { user } = useContext(UserContext);
	const { socket } = useContext(SocketContext);
	const { showModal } = useContext(ModalContext);

	const [remoteStream, setRemoteStream] = useState(null);
	const [pc, setPc] = useState(null);
	const [localVideo, setLocalVideo] = useState(null);
	const [localStream, setLocalStream] = useState(null);
	const [remoteVideo, setRemoteVideo] = useState(null);
	const [senderFrom, setSenderFrom] = useState(null);
	const [isCallActive, setIsCallActive] = useState(false);
	const [isBlockCamera, setIsBlockCamera] = useState(false);

	let videoView;

	useEffect(() => {
		if (localStream === null) {
			setIsBlockCamera(true);
		}
	}, [localStream]);

	useEffect(() => {
		socket.on('user:reject:call', (rejectUserName) => {
			rejectCall(rejectUserName);
			isBlockCamera && pc.pc.removeTrack(senderFrom);
			setPc(null);
			setIsCallActive(false);

			getLocalStream();
		});
	}, [senderFrom]);

	const rejectCall = (rejectUserName) => {
		showModal(<RejectCall rejectUserName={rejectUserName} />);
	};

	const getLocalStream = () => {
		navigator.mediaDevices
			.getUserMedia({ audio: true, video: true })
			.then((localStream) => {
				toggleAudio(localStream);
				localVideo.srcObject = localStream;
				setLocalStream(localStream);
			})
			.catch((error) => {
				// todo change to Notifier
				alert(error);
			})
			.finally(() => {
				setPc(new PeerConnection(peerConnectionConfig));
			});
	};

	const call = async () => {
		socket.emit('get:toUser', companionId);

		socket.on('received:toUser', (toUser) => {
			showModal(
				<Call
					toUser={toUser}
					userName={user.name}
					toUserId={companionId}
					endCall={endCall}
				/>
			);
		});

		await getTracks();

		await createOffer();

		await createIceCandidate();
	};

	const createOffer = () => {
		pc.offer(function(err, offer) {
			if (!err) {
				socket.emit('create:offer', {
					toUserId: companionId,
					fromOffer: offer,
					fromUserId: user.id,
					fromUserName: user.name
				});
			}
		});
	};

	const createIceCandidate = () => {
		pc.on('ice', function(candidate) {
			socket.emit('pc1:ice:send', {
				candidate: candidate,
				toUserId: companionId,
				fromUserId: user.id,
				fromUserName: user.name,
				blockCameraCompanion: !localStream
			});
		});
	};

	const getTracks = () => {
		if (localStream) {
			localStream.getTracks().forEach((track) => {
				const sender = pc.pc.addTrack(track, localStream);
				setSenderFrom(sender);
			});
		} else {
			setIsBlockCamera(true);
		}
	};

	const endCall = () => {
		if (pc.pc.iceConnectionState === 'completed') {
			!isBlockCamera && pc.pc.removeTrack(senderFrom);
			remoteVideo.srcObject = null;
			getLocalStream();
			setIsCallActive(false);
			socket.emit('pc:endCall', companionId);
		} else {
			socket.emit('pc2:endCall', {
				fromUserId: user.id,
				toUserId: companionId
			});
		}
	};

	const toggleFullScreen = () => {
		if (!videoView) {
			return;
		}

		document.fullscreen
			? document.exitFullscreen()
			: videoView.requestFullscreen();
	};

	return (
		<StyledVideo ref={(element) => (videoView = element)}>
			<StyledVideoTrickWrapper>
				<StyledRemoteVideoWrapper isCallActive={isCallActive}>
					<video
						ref={(element) => setRemoteVideo(element)}
						autoPlay
						width={'100%'}
					/>
				</StyledRemoteVideoWrapper>

				<StyledLocalVideoWrapper isCallActive={isCallActive}>
					<video
						ref={(element) => setLocalVideo(element)}
						autoPlay
						width={'100%'}
					/>
				</StyledLocalVideoWrapper>

				<VideoButtons
					isCallActive={isCallActive}
					call={call}
					toggleAudio={() => toggleAudio(localStream)}
					toggleVideo={() => toggleVideo(localStream)}
					endCall={endCall}
					toggleFullScreen={toggleFullScreen}
				/>
			</StyledVideoTrickWrapper>

			{localVideo ? (
				<PeerConnectionFrom
					pc={pc}
					setPc={setPc}
					companionId={companionId}
					setRemoteStream={setRemoteStream}
					localVideo={localVideo}
					getLocalStream={getLocalStream}
					localStream={localStream}
					setLocalStream={setLocalStream}
					remoteVideo={remoteVideo}
					setIsCallActive={setIsCallActive}
				/>
			) : null}

			{localVideo && remoteVideo ? (
				<PeerConnectionTo
					localVideo={localVideo}
					getLocalStream={getLocalStream}
					localStream={localStream}
					remoteVideo={remoteVideo}
					remoteStream={remoteStream}
					setIsCallActive={setIsCallActive}
				/>
			) : null}
		</StyledVideo>
	);
};

Video.propTypes = {
	companionId: PropTypes.string
};
