import React from 'react';
import PropTypes from 'prop-types';

import { Decorator } from '../../Common/Decorator/Decorator';
import { StyledNameCancel } from '../PeerConnectionFrom/styles';

export const MissedCall = ({ missedUserName }) => {
	return (
		<Decorator>
			<Decorator indentLeft={'130px'}>
				<img src={'/src/endcall100.png'} alt={'endcall'} />
			</Decorator>
			<StyledNameCancel>Missed call from {missedUserName}</StyledNameCancel>
		</Decorator>
	);
};

MissedCall.propTypes = {
	missedUserName: PropTypes.string
};
