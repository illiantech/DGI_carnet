import { useState, useEffect, useRef } from 'react';
import { userTextFormatted } from '../resources/mapping';
import { rootServer } from '../resources/consts';
import { objPUT } from '../resources/querys';

const putDescrip = (id, descrip) => {
	return fetch(`${rootServer}/descripciones/${id}`, objPUT(descrip))
		.then((res) => res.json())
		.then((res) => {
			console.log(res);
		});
};

export function useDescrip({ description, id }) {
	const [textDescrip, setTextDescrip] = useState(description);
	const [loadDescrip, setLoadDescrip] = useState(false);
	const refTextareaDescrip = useRef();
	const refElmtDescrip = useRef();

	useEffect(() => {
		const controlQueryDescrip = async () => {
			if (textDescrip) refTextareaDescrip.current = textDescrip;

			const textareaValue = userTextFormatted(refElmtDescrip.current?.value.trim());

			if (!textDescrip && textareaValue && textareaValue !== refTextareaDescrip.current) {
				try {
					await putDescrip(id, textareaValue);

					setTextDescrip(textareaValue);
				} catch (err) {
					alert(`Error de conexión\nError al cambiar decripciòn\n${err}`);
				} finally {
					setLoadDescrip(false);
				}
			} else {
				setLoadDescrip(false);
				setTextDescrip('');
			}
		};
		if (loadDescrip) controlQueryDescrip();
	}, [loadDescrip]);

	return { refTextareaDescrip, textDescrip, loadDescrip, setLoadDescrip, refElmtDescrip };
}
