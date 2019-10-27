import styled from 'styled-components';

import { Color } from '../../../constants/colors';

export const StyledVideoButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3em;
	height: 3em;
	margin: 0 0.4em;
	border-radius: 50%;
	border: 0;
	color: ${Color.WHITE};
	background: #454545;
	cursor: pointer;
	transition: all 0.2s ease-out;
	outline: none;

	&:hover {
		background: rgba(64, 124, 247, 1);
	}
`;

export const StyledCalledName = styled.div`
	margin-left: 52px;
	font-weight: bold;
	font-size: 26px;
	color: #0070c9;
`;

export const StyledNameCancel = styled.div`
	font-size: 26px;
	font-weight: bold;
	color: #0070c9;
`;

export const StyledCallbackButton = styled.div`
	z-index: 999;
	height: 68px;
	width: 68px;
	margin-left: 160px;
	margin-top: 20px;
	text-align: center;
	border: 2px solid #38a3fd;
	border-radius: 50%;
	background: #38a3fd;
	animation: hoverWave linear 1s infinite;
	box-shadow: 0 8px 10px rgba(56, 163, 253, 0.3);
	cursor: pointer;
	transition: 0.3s;
	-webkit-animation: hoverWave linear 1s infinite;

	&:hover {
		z-index: 1;
		color: transparent;
		background: ${Color.WHITE};
		transition: 0.3s;
	}

	&:hover img {
		display: none;
	}

	img {
		margin-top: 10px;
		font-size: 34px;
		line-height: 66px;
		color: ${Color.WHITE};
		transition: 0.5s ease-in-out;
	}

	img {
		animation: 1200ms ease 0s normal none 1 running shake;
		animation-iteration-count: infinite;
		-webkit-animation: 1200ms ease 0s normal none 1 running shake;
		-webkit-animation-iteration-count: infinite;
	}

	@-webkit-keyframes hoverWave {
		0% {
			box-shadow: 0 8px 10px rgba(56, 163, 253, 0.3),
				0 0 0 0 rgba(56, 163, 253, 0.2), 0 0 0 0 rgba(56, 163, 253, 0.2);
		}
		40% {
			box-shadow: 0 8px 10px rgba(56, 163, 253, 0.3),
				0 0 0 15px rgba(56, 163, 253, 0.2), 0 0 0 0 rgba(56, 163, 253, 0.2);
		}
		80% {
			box-shadow: 0 8px 10px rgba(56, 163, 253, 0.3),
				0 0 0 30px rgba(56, 163, 253, 0),
				0 0 0 26.7px rgba(56, 163, 253, 0.067);
		}
		100% {
			box-shadow: 0 8px 10px rgba(56, 163, 253, 0.3),
				0 0 0 30px rgba(56, 163, 253, 0), 0 0 0 40px rgba(56, 163, 253, 0);
		}
	}
	@keyframes hoverWave {
		0% {
			box-shadow: 0 8px 10px rgba(56, 163, 253, 0.3),
				0 0 0 0 rgba(56, 163, 253, 0.2), 0 0 0 0 rgba(56, 163, 253, 0.2);
		}
		40% {
			box-shadow: 0 8px 10px rgba(56, 163, 253, 0.3),
				0 0 0 15px rgba(56, 163, 253, 0.2), 0 0 0 0 rgba(56, 163, 253, 0.2);
		}
		80% {
			box-shadow: 0 8px 10px rgba(56, 163, 253, 0.3),
				0 0 0 30px rgba(56, 163, 253, 0),
				0 0 0 26.7px rgba(56, 163, 253, 0.067);
		}
		100% {
			box-shadow: 0 8px 10px rgba(56, 163, 253, 0.3),
				0 0 0 30px rgba(56, 163, 253, 0), 0 0 0 40px rgba(56, 163, 253, 0);
		}
	}

	/* animations icon */

	@keyframes shake {
		0% {
			transform: rotateZ(0deg);
			-ms-transform: rotateZ(0deg);
			-webkit-transform: rotateZ(0deg);
		}
		10% {
			transform: rotateZ(-30deg);
			-ms-transform: rotateZ(-30deg);
			-webkit-transform: rotateZ(-30deg);
		}
		20% {
			transform: rotateZ(15deg);
			-ms-transform: rotateZ(15deg);
			-webkit-transform: rotateZ(15deg);
		}
		30% {
			transform: rotateZ(-10deg);
			-ms-transform: rotateZ(-10deg);
			-webkit-transform: rotateZ(-10deg);
		}
		40% {
			transform: rotateZ(7.5deg);
			-ms-transform: rotateZ(7.5deg);
			-webkit-transform: rotateZ(7.5deg);
		}
		50% {
			transform: rotateZ(-6deg);
			-ms-transform: rotateZ(-6deg);
			-webkit-transform: rotateZ(-6deg);
		}
		60% {
			transform: rotateZ(5deg);
			-ms-transform: rotateZ(5deg);
			-webkit-transform: rotateZ(5deg);
		}
		70% {
			transform: rotateZ(-4.28571deg);
			-ms-transform: rotateZ(-4.28571deg);
			-webkit-transform: rotateZ(-4.28571deg);
		}
		80% {
			transform: rotateZ(3.75deg);
			-ms-transform: rotateZ(3.75deg);
			-webkit-transform: rotateZ(3.75deg);
		}
		90% {
			transform: rotateZ(-3.33333deg);
			-ms-transform: rotateZ(-3.33333deg);
			-webkit-transform: rotateZ(-3.33333deg);
		}
		100% {
			transform: rotateZ(0deg);
			-ms-transform: rotateZ(0deg);
			-webkit-transform: rotateZ(0deg);
		}
	}

	@-webkit-keyframes shake {
		0% {
			transform: rotateZ(0deg);
			-ms-transform: rotateZ(0deg);
			-webkit-transform: rotateZ(0deg);
		}
		10% {
			transform: rotateZ(-30deg);
			-ms-transform: rotateZ(-30deg);
			-webkit-transform: rotateZ(-30deg);
		}
		20% {
			transform: rotateZ(15deg);
			-ms-transform: rotateZ(15deg);
			-webkit-transform: rotateZ(15deg);
		}
		30% {
			transform: rotateZ(-10deg);
			-ms-transform: rotateZ(-10deg);
			-webkit-transform: rotateZ(-10deg);
		}
		40% {
			transform: rotateZ(7.5deg);
			-ms-transform: rotateZ(7.5deg);
			-webkit-transform: rotateZ(7.5deg);
		}
		50% {
			transform: rotateZ(-6deg);
			-ms-transform: rotateZ(-6deg);
			-webkit-transform: rotateZ(-6deg);
		}
		60% {
			transform: rotateZ(5deg);
			-ms-transform: rotateZ(5deg);
			-webkit-transform: rotateZ(5deg);
		}
		70% {
			transform: rotateZ(-4.28571deg);
			-ms-transform: rotateZ(-4.28571deg);
			-webkit-transform: rotateZ(-4.28571deg);
		}
		80% {
			transform: rotateZ(3.75deg);
			-ms-transform: rotateZ(3.75deg);
			-webkit-transform: rotateZ(3.75deg);
		}
		90% {
			transform: rotateZ(-3.33333deg);
			-ms-transform: rotateZ(-3.33333deg);
			-webkit-transform: rotateZ(-3.33333deg);
		}
		100% {
			transform: rotateZ(0deg);
			-ms-transform: rotateZ(0deg);
			-webkit-transform: rotateZ(0deg);
		}
	}
`;

export const StyledTextCall = styled.div`
	position: relative;
	height: 68px;
	width: 68px;
	border-radius: 50%;
	overflow: hidden;

	span {
		position: absolute;
		right: 6px;
		top: 27px;
		line-height: 14px;
		text-align: center;
		font-size: 0;
		font-weight: 600;
		font-family: 'montserrat', Arial, Helvetica, sans-serif;
		text-transform: uppercase;
		color: #38a3fd;
		opacity: 0;
		transition: opacity 0.3s linear;
	}

	&:hover span {
		font-size: 11px;
		opacity: 1;
	}
`;
