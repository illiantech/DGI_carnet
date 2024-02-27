import { useEffect, useRef } from 'react';
import { mapData } from '../resources/mapping';
import { getUsers } from './controlUsers';

export function useLazyUser({ setUsers, setVisibleUser, visibleUser, refSearch }) {
	const userViews = useRef(0);

	useEffect(() => {
		const queryUsersOberver = async () => {
			try {
				const data = await getUsers(refSearch.current, userViews.current);

				const newUsers = mapData(data[0]);

				setUsers((previewUsers) => [...previewUsers, ...newUsers]);
			} catch (err) {
				alert(`Error de conexión\n${err}`);
			} finally {
				setVisibleUser(false);
			}
		};

		if (visibleUser) {
			userViews.current += 5;

			queryUsersOberver();
		}
	}, [visibleUser]);

	return { userViews };
}
