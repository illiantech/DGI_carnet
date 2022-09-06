import dataTable, { rootServer, objPost, $crE } from './data_table.js';

// value check box

const users = document.getElementById('users');

users.addEventListener('click', async (e) => {
	if (e.target.title) {
		const id = e.target.parentElement.parentElement.children[5].textContent;

		try {
			// fetch que mande datos a la BD
			if (!e.target.classList.contains('user--check__active'))
				await fetch(`${rootServer}/entregados/${id}`, objPost(true))
					.then((res) => res.json())
					.then((res) => console.log(res));
			e.target.classList.add('user--check__active');
		} catch (err) {
			alert(`Error de conexión\n${err}`);
		}
	}
});

// CALL API

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
		alert(`Error de conexión\n${err}`);
	}
});
