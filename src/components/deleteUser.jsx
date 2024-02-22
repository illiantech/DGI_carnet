/* eslint-disable react/prop-types */
import React from 'react';
import { useDelete } from '../hooks/userDelete';

export function DeleteUser({ setDeleteAlert, refTimeoutDeleteAlert, id, setCountUsers, setUsers, deleteAlert }) {
	const { createHandleDeleteUser } = useDelete();

	return (
		<button
			title="Borrar"
			className="user--delete"
			onClick={createHandleDeleteUser({ setDeleteAlert, refTimeoutDeleteAlert, id, setCountUsers, setUsers, deleteAlert })}></button>
	);
}
