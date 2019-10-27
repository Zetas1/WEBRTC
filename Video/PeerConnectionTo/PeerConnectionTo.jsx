import React, { useLayoutEffect } from 'react';
import { useContext, useEffect, useState } from 'react';
import PeerConnection from 'rtcpeerconnection';

import { peerConnectionConfig } from '../PeerConnectionFrom/constants';
import { SocketContext } from '../../../index';
import { CallModal } from '../CallModal/CallModal';
import { ModalContext } from '../../Common/Modal/Modal';
import { UserContext } from '../../App/App';
import { MissedCall } from '../MissedCall/MissedCall';

export const PeerConnectionTo = ({
	remoteVideo,
	remoteStream,
	getLocalStream,
	localStream,
	setIsCallActive
}) => {
	const { socket } = useContext(SocketContext);
	const { user } = useContext(UserContext);
	const { hideModal, showModal } = useContext(ModalContext);

	const [pc2, setPc2] = useState(null);
	const [receivedOffer, setReceivedOffer] = useState(null);
	const [toUserId, setToUserId] = useState(null);
	const [senderTo, setSenderTo] = useState(null);
	const [isBlockCamera, setIsBlockCamera] = useState(false);

	useEffect(() => {
		socket.on('remote:offer', (remoteOffer) => {
			setPc2(new PeerConnection(peerConnectionConfig));
			setReceivedOffer(remoteOffer);
		});

		if (receivedOffer !== null) {
			createAnswer(receivedOffer);
		}
	}, [receivedOffer]);

	useEffect(() => {
		socket.on('pc1:ice:remote', (remoteCandidate) => {
			installIcePc2(remoteCandidate);
			setToUserId(remoteCandidate.fromUserId);
		});

		socket.on('user:missed:call', (missedUserName) => {
			missedCall(missedUserName);
		});
	}, [pc2]);

	useEffect(() => {
		socket.on('got:remote:stream', () => {
			addRemoteStream();
		});
	}, [remoteStream]);

	useEffect(() => {
		socket.on('pc2:endCall:answer', () => {
			remoteVideo.srcObject = null;
			!isBlockCamera && pc2.pc.removeTrack(senderTo);
			getLocalStream();
			setPc2(null);
			setIsCallActive(false);
			socket.emit('pc:endCall', toUserId);
		});
	}, [senderTo, toUserId]);

	useLayoutEffect(() => {
		getLocalStream();
	}, []);

	const createAnswer = async (remoteOffer) => {
		if (localStream) {
			localStream.getTracks().forEach((track) => {
				setSenderTo(pc2.pc.addTrack(track, localStream));
			});
		} else {
			setIsBlockCamera(true);
		}

		await handleOffer(remoteOffer);
	};

	const handleOffer = (remoteOffer) => {
		pc2.handleOffer(remoteOffer.fromOffer, function() {
			pc2.answer(function(err, answer) {
				socket.emit('answer', {
					answer: answer,
					fromUserId: remoteOffer.fromUserId
				});
			});
		});
	};

	const installIcePc2 = async (remoteCandidate) => {
		await pc2.processIce(remoteCandidate.candidate);

		await createIceCandidate(remoteCandidate);

		if (remoteCandidate.blockCameraCompanion) {
			const remoteData = {
				fromUserId: remoteCandidate.fromUserId,
				fromUserName: remoteCandidate.fromUserName
			};

			callModal(remoteData);
		} else {
			onAddStream(remoteCandidate);
		}
	};

	const onAddStream = (remoteCandidate) => {
		pc2.on('addStream', function(event) {
			const remoteData = {
				fromUserId: remoteCandidate.fromUserId,
				fromUserName: remoteCandidate.fromUserName,
				eventStream: event.stream
			};

			callModal(remoteData);
		});
	};

	const createIceCandidate = (remoteCandidate) => {
		pc2.on('ice', function(candidate) {
			socket.emit('pc2:ice:send', {
				candidate: candidate,
				fromUserId: remoteCandidate.fromUserId
			});
		});
	};

	const callModal = (remoteData) => {
		return showModal(
			<CallModal
				remoteData={remoteData}
				addStream={addStream}
				userName={user.name}
			/>
		);
	};

	const addStream = (remoteData) => {
		hideModal();
		remoteVideo.srcObject = remoteData.eventStream;
		setIsCallActive(true);
		socket.emit('get:remote:stream', remoteData.fromUserId);
	};

	const addRemoteStream = () => {
		hideModal();
		remoteVideo.srcObject = remoteStream;
		setIsCallActive(true);
	};

	const missedCall = (missedUserName) => {
		showModal(<MissedCall missedUserName={missedUserName} />);
	};

	return null;
};
