export const servers = {
	lifetimeDuration: '86400s',
	iceServers: [
		{
			urls: [
				'stun:64.233.161.127:19302',
				'stun:stun2.l.google.com:19302',
				'stun:stun3.l.google.com:19302',
				'stun:stun4.l.google.com:19302',
				'stun:stun.stunprotocol.org:3478',
				'stun:[2a00:1450:4010:c01::7f]:19302'
			]
		},
		{
			urls: [
				'turn:64.233.161.127:19305?transport=udp',
				'turn:[2a00:1450:4010:c01::7f]:19305?transport=udp'
			],
			username: 'COjcqOgFEgazhiebCwkYzc/s6OMTIICjBQ',
			credential: 'RZcbO+RSMhOCyN8qxB3WE69tAu0=',
			maxRateKbps: '8000'
		}
	],
	blockStatus: 'NOT_BLOCKED',
	iceTransportPolicy: 'all'
};

export const peerConnectionConfig = {
	iceServers: [
		{
			urls: [
				'turn:173.194.72.127:19305?transport=udp',
				'turn:[2404:6800:4008:C01::7F]:19305?transport=udp',
				'turn:173.194.72.127:443?transport=tcp',
				'turn:[2404:6800:4008:C01::7F]:443?transport=tcp'
			],
			username: 'CKjCuLwFEgahxNRjuTAYzc/s6OMT',
			credential: 'u1SQDR/SQsPQIxXNWQT7czc/G4c='
		},
		{ urls: ['stun:stun.l.google.com:19302'] }
	]
};
