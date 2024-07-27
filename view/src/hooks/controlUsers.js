import { useState, useCallback } from 'react';
import { ErrorConnect, mapData } from '../resources/mapping';
import { rootServer } from '../resources/consts';

export const getUsers = ({ ciForm, nameForm, dateForm, checkForm }, userViews) => {
  return fetch(`${rootServer}/users?ci=${ciForm}&name=${nameForm}&date=${dateForm}&delivered=${checkForm}&userCount=${userViews}`)
    .then((res) => {
      if (res.status >= 400) {
        throw new ErrorConnect();
      }
      return res.json();
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch(() => {
      throw new ErrorConnect();
    });
};

export function useUsers({ refSearch, setSubmit }) {
  const [users, setUsers] = useState([]);
  const [countUsers, setCountUsers] = useState(0);

  const controlQueryUsers = useCallback(async ({ fields, form }) => {
    setSubmit(true);

    try {
      const data = await getUsers(fields, 0);

      if (data[1] > 0) {
        setUsers(mapData(data[0]));
        setCountUsers(data[1]);
      } else {
        setUsers(undefined);
        setCountUsers(0);
      }
    } catch (err) {
      if (err instanceof ErrorConnect) alert(err);
      refSearch.current = undefined;
    } finally {
      setSubmit(false);
      form.reset();
    }
  }, []);

  return { controlQueryUsers, users, setUsers, countUsers, setCountUsers };
}
