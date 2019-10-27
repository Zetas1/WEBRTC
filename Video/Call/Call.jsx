import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { SocketContext } from '../../../index';
import { ModalContext } from '../../Common/Modal/Modal';
import { Decorator } from '../../Common/Decorator/Decorator';
import { StyledCalledName } from '../PeerConnectionFrom/styles';
import { FormActions } from '../../Common/Form/FormActions/FormActions';
import { Button } from '../../Common/Button/Button';

export const Call = ({ toUser, userName, toUserId, endCall }) => {
	const { socket } = useContext(SocketContext);
	const { hideModal } = useContext(ModalContext);

	const missedCall = () => {
		socket.emit('missed:call', {
			fromUserName: userName,
			toUserId: toUserId
		});
		endCall();
		hideModal();
	};

	return (
		<Decorator width={'332px'} height={'135px'}>
			<audio
				src="https://www.mediacollege.com/downloads/sound-effects/electronics/phone/Phone_01.wav"
				autoPlay
				loop={true}
			></audio>

			<StyledCalledName>Вы звоните {toUser.name}</StyledCalledName>

			<Decorator indentTop={'20px'}>
				<FormActions>
					<Button theme={'grey'} type={'button'} onClick={missedCall}>
						Cancel
					</Button>
				</FormActions>
			</Decorator>
		</Decorator>
	);
};

Call.propTypes = {
	toUser: PropTypes.object,
	userName: PropTypes.string,
	toUserId: PropTypes.string,
	endCall: PropTypes.func
};
