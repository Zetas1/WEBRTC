import React from 'react';
import PropTypes from 'prop-types';

import { StyledVideoButton } from '../PeerConnectionFrom/styles';
import { StyledVideoButtons } from '../styles';

export const VideoButtons = ({
	call,
	toggleAudio,
	toggleVideo,
	endCall,
	isCallActive,
	toggleFullScreen
}) => {
	return (
		<StyledVideoButtons>
			{!isCallActive && call ? (
				<StyledVideoButton onClick={call}>
					<img src={'/src/callphone.png'} alt={'callphone'} />
				</StyledVideoButton>
			) : null}

			{toggleAudio ? (
				<StyledVideoButton onClick={toggleAudio}>
					<img src={'/src/mutmicro.png'} alt={'mutmicro'} />
				</StyledVideoButton>
			) : null}

			{toggleVideo ? (
				<StyledVideoButton onClick={toggleVideo}>
					<img src={'/src/mutvideo.png'} alt={'mutvideo'} />
				</StyledVideoButton>
			) : null}

			{isCallActive && endCall ? (
				<StyledVideoButton onClick={endCall}>
					<img src={'/src/endcall.png'} alt={'endcall'} />
				</StyledVideoButton>
			) : null}

			{toggleFullScreen ? (
				<StyledVideoButton onClick={toggleFullScreen}>F</StyledVideoButton>
			) : null}
		</StyledVideoButtons>
	);
};

VideoButtons.propTypes = {
	call: PropTypes.func,
	toggleAudio: PropTypes.func,
	toggleVideo: PropTypes.func,
	endCall: PropTypes.func,
	isCallActive: PropTypes.bool,
	toggleFullScreen: PropTypes.func
};
