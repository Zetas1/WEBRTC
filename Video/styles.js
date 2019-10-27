import styled from 'styled-components';

import { Color } from '../../constants/colors';

export const StyledVideoTrickWrapper = styled.div`
	position: relative;
	left: 0;
	top: 0;
	width: 100%;
	height: 0;
	padding-bottom: 50%;
`;

export const StyledVideoWrapper = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-color: ${Color.BLACK};
	overflow: hidden;
`;

export const StyledLocalVideoWrapper = styled(StyledVideoWrapper)`
	width: ${({ isCallActive }) => (isCallActive ? '200px' : '100%')};
	height: ${({ isCallActive }) => (isCallActive ? 'auto' : '100%')};
	bottom: ${({ isCallActive }) => (isCallActive ? '20px' : '0')};
	right: ${({ isCallActive }) => (isCallActive ? '20px' : '0')};
`;

export const StyledRemoteVideoWrapper = styled(StyledVideoWrapper)`
	display: ${({ isCallActive }) => (isCallActive ? 'flex' : 'none')};
`;

export const StyledVideoButtons = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 60px;
	transition: opacity 100ms linear;
	opacity: 0.5;

	&:hover {
		opacity: 1;
	}
`;

export const StyledVideo = styled.div`
	position: relative;
	width: 100%;
	background-color: ${Color.BLACK};

	&:fullscreen {
		${StyledVideoTrickWrapper} {
			position: fixed;
			height: 100%;
			padding-bottom: 0;
		}

		${StyledVideoButtons} {
			height: 110px;
		}
	}
`;
