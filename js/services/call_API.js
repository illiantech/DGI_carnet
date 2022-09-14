import dataTable, { rootServer, objPutCheck, $crE, updateCheckDateTime as upDate, updateDescription as upDescrip } from './data_table.js';

// Variables y constantes

const form = document.getElementById('form');

const submit = form[3];

const users = document.getElementById('users');

// CALL API Form

form.addEventListener('submit', async (e) => {
	e.preventDefault();

	const ci = e.target[0].value;

	const name = e.target[1].value.trim();

	const date = e.target[2].value;

	try {
		submit.textContent = 'Cargando...';

		const data = await fetch(`${rootServer}/historial?cedula=${ci}&Nombre=${name}&fecha=${date}`)
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
	} catch (err) {
		alert(`Error de conexión\n${err}`);

		submit.textContent = 'Buscar';
	}
});

users.addEventListener('click', async (e) => {
	// CALL API value check box

	// localizando el check box y el id del registro correspondiente
	if (e.target.classList.contains('user--check')) {
		const id = e.target.parentElement.parentElement.children[5].textContent;

		try {
			// fetch que manda datos a la BD
			// compracion de si el check esta desactivado para entrar
			if (!e.target.classList.contains('user--check__active')) {
				// opacidad para UX, indicar al usuario que esta cargando el check

				e.target.classList.add('user--check__load');

				const currentDate = await fetch(`${rootServer}/entregados/${id}`, objPutCheck(true))
					.then((res) => res.json())
					.then((res) => {
						console.log(res);
						return res.fecha_entregado;
					});

				e.target.classList.remove('user--check__load');

				e.target.classList.add('user--check__active');

				e.target.append(upDate(currentDate, $crE));
			}
		} catch (err) {
			alert(`Error de conexión\n${err}`);
			e.target.classList.remove('user--check__load');
		}
	}

	// CALL API Update description
	if (e.target.classList.contains('description-edit--btn')) {
		const id = e.target.parentElement.parentElement.parentElement.children[5].textContent;
	}
});
