const { getSocketsById } = require('../user/user.model');

const videoController = ({ io }) => {
	io.sockets.on('connection', (socket) => {
		socket.on('create:offer', async (createOffer) => {
			try {
				const companionSockets = await getSocketsById({
					userId: createOffer.toUserId
				});

				companionSockets.forEach((socket) => {
					io.to(socket.socketId).emit('remote:offer', createOffer);
				});
			} catch (error) {
				socket.emit(
					'create:offer:error',
					'Возникла ошибка при получение данных РС1.'
				);
			}
		});

		socket.on('answer', async ({ answer, fromUserId }) => {
			try {
				const userSockets = await getSocketsById({ userId: fromUserId });

				userSockets.forEach((socketId) => {
					io.to(socketId.socketId).emit('remote:answer', answer);
				});
			} catch (error) {
				socket.emit(
					'answer:error',
					'Возникла ошибка при получение данных РС1.'
				);
			}
		});

		socket.on('pc1:ice:send', async (pc1IceData) => {
			try {
				const companionSockets = await getSocketsById({
					userId: pc1IceData.toUserId
				});

				companionSockets.forEach((socketId) => {
					io.to(socketId.socketId).emit('pc1:ice:remote', pc1IceData);
				});
			} catch (error) {
				socket.emit(
					'pc1:ice:send:error',
					'Возникла ошибка при получение кандидатов РС1.'
				);
			}
		});

		socket.on('pc2:ice:send', async ({ candidate, fromUserId }) => {
			try {
				const userSockets = await getSocketsById({ userId: fromUserId });

				userSockets.forEach((socketId) => {
					io.to(socketId.socketId).emit('pc2:ice:remote', candidate);
				});
			} catch (error) {
				socket.emit(
					'pc1:ice:send:error',
					'Возникла ошибка при получение кандидатов РС2.'
				);
			}
		});

		socket.on('reject:call', async ({ fromUserName, toUserId }) => {
			try {
				const companionSockets = await getSocketsById({ userId: toUserId });

				companionSockets.forEach((socket) => {
					io.to(socket.socketId).emit('user:reject:call', fromUserName);
				});
			} catch (error) {
				socket.emit(
					'reject:call:error',
					'Возникла ошибка при отклонение звонка.'
				);
			}
		});

		socket.on('missed:call', async ({ fromUserName, toUserId }) => {
			try {
				const companionSockets = await getSocketsById({ userId: toUserId });

				companionSockets.forEach((socket) => {
					io.to(socket.socketId).emit('user:missed:call', fromUserName);
				});
			} catch (error) {
				socket.emit(
					'missed:call:error',
					'Возникла ошибка при пропущенном звонке.'
				);
			}
		});

		socket.on('pc:endCall', async (id) => {
			try {
				const companionSockets = await getSocketsById({ userId: id });

				companionSockets.forEach((socket) => {
					io.to(socket.socketId).emit('pc:endCall:answer');
				});
			} catch (error) {
				socket.emit(
					'pc:endCall:error',
					'Возникла ошибка при окончание звонка РС1.'
				);
			}
		});

		socket.on('pc2:endCall', async ({ fromUserId, toUserId }) => {
			try {
				const userSockets = await getSocketsById({ userId: fromUserId });

				userSockets.forEach((socket) => {
					io.to(socket.socketId).emit('pc2:endCall:answer', toUserId);
				});
			} catch (error) {
				socket.emit(
					'pc2:endCall:error',
					'Возникла ошибка при окончание звонка РС2.'
				);
			}
		});

		socket.on('get:remote:stream', async (id) => {
			try {
				const companionSockets = await getSocketsById({ userId: id });

				companionSockets.forEach((socket) => {
					io.to(socket.socketId).emit('got:remote:stream');
				});
			} catch (error) {
				socket.emit(
					'get:remote:stream',
					'Возникла ошибка при отправке удаленного потока.'
				);
			}
		});
	});
};

module.exports = {
	videoController
};
