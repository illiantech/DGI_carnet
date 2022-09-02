import dataTable, { rootPost, objPost } from './data_table.js';

// value check box

const users = document.getElementById('users');

users.addEventListener('click', async (e) => {
	if (e.target.title) {
		e.target.classList.toggle('user--check__active');

		try {
			// fetch que mande datos a la BD
			if (e.target.classList.contains('user--check__active'))
				await fetch(rootPost, objPost(true))
					.then((data) => data.json())
					.then((res) => console.log(res));
			else
				await fetch(rootPost, objPost(false))
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

	let dateTime = e.target[0].value;

	if (dateTime.length === 0) dateTime = undefined;

	let ci = e.target[1].value;

	if (ci.length === 0) ci = undefined;

	try {
		const data = await fetch(`https://jsonplaceholder.typicode.com/posts`).then((res) => res.json());

		dataTable(data, users);
	} catch (err) {
		alert(`Error de conexión\n${err}`);
	}
});
