/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { CheckUser } from './user-childrens/checkUser';
import { DescripWrapperUser } from './user-childrens/descripwrapperUser';
import { ButtonWrapperUser } from './user-childrens/buttonWrapperUser';
import { userTextFormatted, userNameFormatted, userDateFormatted } from '../resources/mapping';

export function User({ delivered, deliveredDate, description, ci, name, id, date, position, dependence, children }) {
	const [viewWrapper, setViewWrapper] = useState(false);

	const classWrapper = viewWrapper ? 'wrapper-user wrapper-user__active' : 'wrapper-user';

	return (
		<article className="user">
			{children}
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
			<CheckUser delivered={delivered} deliveredDate={deliveredDate} id={id} />
			<aside className={classWrapper}>
				<ButtonWrapperUser setViewWrapper={setViewWrapper} />
				<h3 className="wrapper-user--title">Cargo</h3>
				<p className="wrapper-user--content">{userTextFormatted(position)}</p>
				<h3 className="wrapper-user--title">Dependencia</h3>
				<p className="wrapper-user--content">{userTextFormatted(dependence)}</p>
				<h3 className="wrapper-user--title">Descripción</h3>
				<DescripWrapperUser description={description} id={id} />
			</aside>
		</article>
	);
}
