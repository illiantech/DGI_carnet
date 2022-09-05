import dataTable, { rootServer, objPost } from './data_table.js';

// value check box

const users = document.getElementById('users');

users.addEventListener('click', async (e) => {
	if (e.target.title) {
		e.target.classList.toggle('user--check__active');

		const id = e.target.pattern;
		console.log(id);

		try {
			// fetch que mande datos a la BD
			if (e.target.classList.contains('user--check__active'))
				await fetch('https://jsonplaceholder.typicode.com/posts', objPost(true))
					.then((data) => data.json())
					.then((res) => console.log(res));
			else
				await fetch('https://jsonplaceholder.typicode.com/posts', objPost(false))
					.then((data) => data.json())
					.then((res) => console.log(res));
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

		dataTable(data, users);
	} catch (err) {
		alert(`Error de conexión\n${err}`);
	}
});
