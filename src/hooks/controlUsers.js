import { useState, useCallback } from 'react';
import { rootServer, mapData } from '../consts';

export const getUsers = ({ ciForm, nameForm, dateForm, checkForm }, userViews) => {
	// `${rootServer}/historial?cedula=${ciForm}&Nombre=${nameForm}&fecha=${dateForm}&entregado=${checkForm}&userViews=${}`
	// `http://localhost:5173/src/data.json`
	return fetch(`${rootServer}/historial?cedula=${ciForm}&Nombre=${nameForm}&fecha=${dateForm}&entregado=${checkForm}&userViews=${userViews}`)
		.then((res) => res.json())
		.then((res) => {
			console.log(res);
			return res;
		});
};

export function useUsers({ refSearch,setSubmit }) {
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
				// no declarar estados fuera de su tipo
				setUsers(false);
				setCountUsers(0);
			}
		} catch (err) {
			alert(`Error de conexión\nError de formulario\n${err}`);
			refSearch.current = undefined;
		} finally {
			setSubmit(false);
			form.reset();
		}
	}, []);

	return { controlQueryUsers, users, setUsers, countUsers, setCountUsers };
}
