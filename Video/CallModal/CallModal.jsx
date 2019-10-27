import React, { useContext } from 'react';

import { SocketContext } from '../../../index';
import { ModalContext } from '../../Common/Modal/Modal';
import { Decorator } from '../../Common/Decorator/Decorator';
import {
	StyledCallbackButton,
	StyledCalledName,
	StyledTextCall
} from '../PeerConnectionFrom/styles';
import { FormActions } from '../../Common/Form/FormActions/FormActions';
import { Button } from '../../Common/Button/Button';
import PropTypes from 'prop-types';

export const CallModal = ({ remoteData, userName, addStream }) => {
	const { socket } = useContext(SocketContext);
	const { hideModal } = useContext(ModalContext);

	const rejectCall = () => {
		socket.emit('reject:call', {
			fromUserName: userName,
			toUserId: remoteData.fromUserId
		});
		hideModal();
	};

	return (
		<Decorator width={'400px'} height={'230px'}>
			<audio
				src="http://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp4"
				autoPlay
				loop={true}
			/>

			<StyledCalledName>
				Incoming call from {remoteData.fromUserName}
			</StyledCalledName>

			<StyledCallbackButton
				type="button"
				onClick={() => {
					addStream(remoteData);
				}}
			>
				<StyledTextCall className="text-call">
					<img src={'/src/phone2.png'} alt={'phone'} />
					<span>Accept</span>
				</StyledTextCall>
			</StyledCallbackButton>

			<Decorator indentTop={'20px'}>
				<FormActions>
					<Button theme={'grey'} type={'button'} onClick={rejectCall}>
						Cancel
					</Button>
				</FormActions>
			</Decorator>
		</Decorator>
	);
};

CallModal.propTypes = {
	remoteData: PropTypes.object,
	userName: PropTypes.string,
	addStream: PropTypes.func
};
