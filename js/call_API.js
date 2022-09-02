import dataTable, { users, data } from './data_table.js';

// value check box

users.addEventListener('click', (e) => {
	if (e.target.title) {
		e.target.classList.toggle('user--check__active');

		// fetch que mande datos a la BD
		// if (e.target.classList.contains('user--check__active')) e.target.setAttribute('data-check', true);
		// else e.target.setAttribute('data-check', false);
	}
});

// CALL API

const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
	e.preventDefault();

	let dateTime = e.target[0].value;

	if (dateTime.length === 0) dateTime = undefined;

	let ci = e.target[1].value;

	if (ci.length === 0) ci = undefined;

	console.log(dateTime);
	console.log(ci);

	dataTable(data);
});
