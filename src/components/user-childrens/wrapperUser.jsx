/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { ButtonWrapperUser } from './buttonWrapperUser';
import { userTextFormatted } from '../../resources/mapping';

export function WrapperUser({ position, dependence, children }) {
	const [viewWrapper, setViewWrapper] = useState(false);

	const classWrapper = viewWrapper ? 'wrapper-user wrapper-user__active' : 'wrapper-user';

	return (
		<aside className={classWrapper}>
			<ButtonWrapperUser setViewWrapper={setViewWrapper} />
			<h3 className="wrapper-user--title">Cargo</h3>
			<p className="wrapper-user--content">{userTextFormatted(position)}</p>
			<h3 className="wrapper-user--title">Dependencia</h3>
			<p className="wrapper-user--content">{userTextFormatted(dependence)}</p>
			<h3 className="wrapper-user--title">Descripción</h3>
			{children}
		</aside>
	);
}
