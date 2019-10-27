import React from 'react';
import PropTypes from 'prop-types';

import { Decorator } from '../../Common/Decorator/Decorator';
import { StyledNameCancel } from '../PeerConnectionFrom/styles';

export const RejectCall = ({ rejectUserName }) => {
	return (
		<Decorator>
			<Decorator indentLeft={'95px'}>
				<img src={'/src/endcall100.png'} alt={'endcall'} />
			</Decorator>
			<StyledNameCancel>{rejectUserName} rejected the call</StyledNameCancel>
		</Decorator>
	);
};

RejectCall.propTypes = {
	rejectUserName: PropTypes.string
};
