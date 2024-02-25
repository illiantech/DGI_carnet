/* eslint-disable react/prop-types */
import React from 'react';
import { deliveredDateFormatted } from '../../resources/mapping';
import { useCheck } from '../../hooks/userCheck';

export function CheckUser({ delivered, deliveredDate, id }) {
	const { check, loadCheck, deliDate, setLoadCheck } = useCheck({ delivered, deliveredDate, id });

	const titleCheck = check ? 'Entrega confirmada' : 'Confirmar entrega';

	const classCheck = check ? 'check-user--button__active check-user--button' : 'checkuser--button';

	const stylelineCheck = loadCheck ? { opacity: 0.5 } : { opacity: 1 };

	const handleCheck = () => {
		if (!check) setLoadCheck(true);

		// setLoadCheck(true);
	};

	return (
		<div className="check-user">
			<button onClick={handleCheck} title={titleCheck} style={stylelineCheck} className={classCheck}></button>
			{check && (
				<time dateTime={deliDate} title="Fecha de entrega" className="check-user--dateTime">
					{deliveredDateFormatted(deliDate)}
				</time>
			)}
		</div>
	);
}
