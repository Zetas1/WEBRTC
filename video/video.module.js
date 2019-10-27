const { videoController } = require('./video.controller');

const videoModule = (io) => {
	videoController(io);
};

module.exports = {
	videoModule
};
