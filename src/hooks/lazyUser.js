import { useEffect, useRef } from 'react';
import { mapData } from '../resources/mapping';
import { getUsers } from './controlUsers';

export function useLazyUser({ setUsers, setVisibleUser, visibleUser, refSearch }) {
	const userViews = useRef(0);

	useEffect(() => {
		const queryUsersOberver = async () => {
			const data = await getUsers(refSearch.current, userViews.current)
				.catch((err) => alert(`Error de conexión\n${err}`))
				.finally(() => setVisibleUser(false));

			console.log(visibleUser);
			const newUsers = mapData(data[0]);

			setUsers((previewUsers) => [...previewUsers, ...newUsers]);
		};

		if (visibleUser) {
			userViews.current += 5;

			queryUsersOberver();
		}
	}, [visibleUser]);

	return { userViews };
}
