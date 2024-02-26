/* eslint-disable react/prop-types */
import React from 'react';
import { userNameFormatted, userDateFormatted } from '../../resources/mapping';

export function FrontUser({ ci, id, date, name, children }) {
	return (
		<>
			<h3 className="user--title">Cédula</h3>
			<p className="user--content">{ci}</p>
			<h3 className="user--title">Nombre</h3>
			<p className="user--content">{userNameFormatted(name)}</p>
			<h3 className="user--title">ID</h3>
			<p className="user--content">{id}</p>
			<h3 className="user--title">Fecha</h3>
			<time className="user--content" dateTime={date}>
				{userDateFormatted(date)}
			</time>
			<h3 className="user--title">Entregado</h3>
			{children}
		</>
	);
}
