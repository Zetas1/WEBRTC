import { useContext, useEffect } from 'react';

import { SocketContext } from '../../../index';

export const PeerConnectionFrom = ({
	pc,
	setPc,
	getLocalStream,
	setRemoteStream,
	remoteVideo,
	setIsCallActive
}) => {
	const { socket } = useContext(SocketContext);

	useEffect(() => {
		socket.on('remote:answer', (remoteAnswer) => {
			setRemoteAnswer(remoteAnswer);
			setIsCallActive(true);
		});

		socket.on('pc2:ice:remote', (candidate) => {
			installIcePc(candidate);
		});

		socket.on('pc:endCall:answer', () => {
			remoteVideo.srcObject = null;
			setPc(null);
			setIsCallActive(false);

			getLocalStream();
		});
	}, [pc]);

	useEffect(() => {
		getLocalStream();
	}, []);

	const setRemoteAnswer = (remoteAnswer) => {
		pc.handleAnswer(remoteAnswer);
	};

	const installIcePc = (remoteCandidate) => {
		pc.processIce(remoteCandidate);

		pc.on('addStream', function(event) {
			setRemoteStream(event.stream);
		});
	};

	return null;
};
