import dataTable, { rootServer, objPost, $crE } from './data_table.js';

// value check box

const users = document.getElementById('users');

users.addEventListener('click', async (e) => {
	if (e.target.title) {
		e.target.classList.toggle('user--check__active');

		const id = e.target.parentElement.parentElement.children[5].textContent;

		try {
			// fetch que mande datos a la BD
			if (e.target.classList.contains('user--check__active'))
				await fetch(`${rootServer}/entregados/${id}`, objPost(true))
					.then((data) => data.json())
					.then((res) => console.log(res));
			else
				await fetch(`${rootServer}/entregados/${id}`, objPost(false))
					.then((data) => data.json())
					.then((res) => console.log(res));
		} catch (err) {
			alert(`Error de conexión\n${err}`);
		}
	}
});

// CALL API 2022-01-17 ci 11238460 carga por cedula && fecha y solo por cedula pero no solo por fecha

const form = document.getElementById('form');

form.addEventListener('submit', async (e) => {
	e.preventDefault();

	let ci = e.target[0].value;

	let dateTime = e.target[1].value;

	try {
		const data = await fetch(`${rootServer}/historial?cedula=${ci}&fecha=${dateTime}`).then((res) => res.json());

		if (data.length === 0) {
			const notFound = $crE('h2');
			notFound.textContent = 'Usuario no encontrado';

			users.innerHTML = '';

			users.append(notFound);
		} else {
			dataTable(data, users, $crE);
		}
	} catch (err) {
		alert(`Error de conexión o campos vacios\n${err}`);
	}
});
