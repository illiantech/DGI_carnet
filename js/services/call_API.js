import dataTable, { rootServer, objPUT, $crE, updateCheckDateTime as upDate, updateDescription as upDescrip } from './data_table.js';

// Variables y constantes

const form = document.getElementById('form');

const submit = form[4];

const users = document.getElementById('users');

// CALL API Form

form.addEventListener('submit', async (e) => {
	const ci = e.target[0].value;

	const name = e.target[1].value.trim();

	const date = e.target[2].value;

	const check = e.target[3].checked;

	try {
		submit.textContent = 'Cargando...';

		const data = await fetch(`${rootServer}/historial?cedula=${ci}&Nombre=${name}&fecha=${date}&entregado=${check}`)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				return res;
			});

		if (data.length === 0) {
			const notFound = $crE('h2');
			notFound.textContent = 'Usuario no encontrado';

			users.innerHTML = '';

			users.append(notFound);

			form.lastElementChild.textContent = '';

			submit.textContent = 'Buscar';
		} else {
			dataTable(data, users, $crE, upDate, upDescrip);

			form.lastElementChild.textContent = `${data.length} Usuarios`;

			submit.textContent = 'Buscar';
		}

		form.reset();
	} catch (err) {
		alert(`Error de conexión\n${err}`);

		submit.textContent = 'Buscar';

		form.reset();
	}
});

users.addEventListener('click', async (e) => {
	// CALL API value check box

	// CALL API Delete User

	if (e.target.classList.contains('user--delete')) {
		const id = e.target.parentElement.children[6].textContent;

		try {
			await fetch(`${rootServer}/eliminados/${id}`, { method: 'DELETE' })
				.then((res) => res.json())
				.then((res) => console.log(res));

			const removeAlert = document.getElementById('removeAlert');

			removeAlert.classList.add('remove-alert__active');
			e.preventDefault();

			const user = id.parentElement;
		} catch (err) {
			alert(`Error de conexión\n${err}`);
		}
	}

	// localizando el check box y el id del registro correspondiente
	if (e.target.classList.contains('user--check')) {
		const id = e.target.parentElement.parentElement.children[6].textContent;

		try {
			// fetch que manda datos a la BD
			// compracion de si el check esta desactivado para entrar
			if (!e.target.classList.contains('user--check__active')) {
				// opacidad para UX, indicar al usuario que esta cargando el check

				e.target.classList.add('user--check__load');

				const currentDate = await fetch(`${rootServer}/entregados/${id}`, objPUT(true))
					.then((res) => res.json())
					.then((res) => {
						console.log(res);
						return res.fecha_entregado;
					});

				e.target.classList.remove('user--check__load');

				e.target.classList.add('user--check__active');

				e.target.setAttribute('title', 'Entrega confirmada');

				e.target.append(upDate(currentDate, $crE));
			}
		} catch (err) {
			alert(`Error de conexión\n${err}`);
			e.target.classList.remove('user--check__load');
		}
	}

	// CALL API Update description
	if (e.target.getAttribute('data-btnDescrip')) {
		const description = e.target.parentElement;

		const id = description.parentElement.parentElement.children[6].textContent;

		if (e.target.textContent === '📤') {
			try {
				let dataDescripEdit = e.target.nextElementSibling.value.trim();

				if (dataDescripEdit) {
					// parseo de la primera letra en Mayuscula porque flex no deja hacer efecto del pseudoElemento
					dataDescripEdit = `${dataDescripEdit.slice(0, 1).toUpperCase()}${dataDescripEdit.slice(1)}`;

					e.target.textContent = '...';

					await fetch(`${rootServer}/descripciones/${id}`, objPUT(dataDescripEdit))
						.then((res) => res.json())
						.then((res) => console.log(res));

					description.innerHTML = '';

					description.append(upDescrip(dataDescripEdit, $crE));
				}
			} catch (err) {
				alert(`Error de conexión\n${err}`);
				e.target.textContent = '📤';
			}
		} else if (e.target.textContent === '✏') {
			const dataDescripText = e.target.nextElementSibling.textContent;

			description.innerHTML = '';

			description.append(upDescrip(undefined, $crE));

			description.children[1].value = dataDescripText;
		}
	}
});
