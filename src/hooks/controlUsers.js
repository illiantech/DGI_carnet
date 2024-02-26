import { useState, useCallback } from 'react';
import { mapData } from '../resources/mapping';
import { rootServer } from '../resources/consts';

export const getUsers = ({ ciForm, nameForm, dateForm, checkForm }, userViews) => {
	return fetch(`${rootServer}/historial?cedula=${ciForm}&Nombre=${nameForm}&fecha=${dateForm}&entregado=${checkForm}&userViews=${userViews}`)
		.then((res) => res.json())
		.then((res) => {
			console.log(res);
			return res;
		});
};

export function useUsers({ refSearch, setSubmit }) {
	const [users, setUsers] = useState([]);
	const [countUsers, setCountUsers] = useState(0);

	const controlQueryUsers = useCallback(async ({ fields, form }) => {
		setSubmit(true);

		const data = await getUsers(fields, 0)
			.catch((err) => {
				alert(`Error de conexión\nError de formulario\n${err}`);
				refSearch.current = undefined;
			})
			.finally(() => {
				setSubmit(false);
				form.reset();
			});

		if (data[1] > 0) {
			setUsers(mapData(data[0]));
			setCountUsers(data[1]);
		} else {
			setUsers(false);
			setCountUsers(0);
		}
	}, []);

	return { controlQueryUsers, users, setUsers, countUsers, setCountUsers };
}
