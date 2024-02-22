import { useCallback } from 'react';
import { rootServer } from '../consts';

const queryDeleteUser = (id) => {
	return fetch(`${rootServer}/eliminados/${id}`, { method: 'DELETE' })
		.then((res) => res.json())
		.then((res) => console.log(res));
};

export function useDelete() {
	const createHandleDeleteUser = useCallback(({ setDeleteAlert, refTimeoutDeleteAlert, id, setCountUsers, setUsers, deleteAlert }) => {
		if (!deleteAlert)
			return async () => {
				try {
					// await queryDeleteUser(id);

					setDeleteAlert(true);

					setUsers((previewUsers) => previewUsers.filter((currentUser) => currentUser.id !== id));

					setCountUsers((previewCountUsers) => previewCountUsers - 1);

					clearTimeout(refTimeoutDeleteAlert.current);
					refTimeoutDeleteAlert.current = setTimeout(() => {
						setDeleteAlert(false);
					}, 3000);
				} catch (err) {
					alert(`Error de conexión\nError al eliminar usuario\n${err}`);
				}
			};
	}, []);

	return { createHandleDeleteUser };
}
