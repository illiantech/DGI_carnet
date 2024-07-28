import React from 'react';
import { useDelete } from '../../hooks/userDelete';

// eslint-disable-next-line react/prop-types
export function DeleteUser({ setDeleteAlert, refTimeoutDeleteAlert, id, setCountUsers, setUsers, deleteAlert }) {
  const { createHandleDeleteUser } = useDelete();

  return (
    <button
      title="Borrar"
      className="user--delete"
      onClick={createHandleDeleteUser({
        setDeleteAlert,
        refTimeoutDeleteAlert,
        id,
        setCountUsers,
        setUsers,
        deleteAlert
      })}></button>
  );
}
