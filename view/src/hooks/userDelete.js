import { useCallback } from 'react';
import { rootServer } from '../resources/consts';
import { ErrorConnect } from '../resources/mapping';

const queryDeleteUser = (id) => {
  return fetch(`${rootServer}/users/${id}`, { method: 'DELETE' })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch(() => {
      throw new ErrorConnect();
    });
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
          if (err instanceof ErrorConnect) alert(err);
        }
      };
  }, []);

  return { createHandleDeleteUser };
}
