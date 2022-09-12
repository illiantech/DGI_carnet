import dataTable, { rootServer, objPost, $crE, updateCheckDateTime as upDate } from './data_table.js';

// value check box

const users = document.getElementById('users');

users.addEventListener('click', async (e) => {
	// localizando el check box y el id del registro correspondiente
	if (e.target.classList.contains('user--check')) {
		const id = e.target.parentElement.parentElement.children[5].textContent;

		try {
			// fetch que manda datos a la BD
			// compracion de si el check esta desactivado para entrar
			if (!e.target.classList.contains('user--check__active')) {
				const currentDate = await fetch(`${rootServer}/entregados/${id}`, objPost(true, currentDate))
					.then((res) => res.json())
					.then((res) => {
						console.log(res);
						return res.fecha_entregado;
					});

				e.target.classList.add('user--check__active');

				e.target.append(upDate(currentDate, $crE));
			}
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
		const data = await fetch(`${rootServer}/historial?cedula=${ci}&fecha=${dateTime}`)
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
		} else {
			dataTable(data, users, $crE, upDate);
		}
	} catch (err) {
		alert(`Error de conexión\n${err}`);
	}
});

let date = new Date().toUTCString();

// console.log(date.toLocaleString()); // posible

console.log(date);

date = new Date(date);

console.log(
	Intl.DateTimeFormat('en-US', {
		timeStyle: 'long'
	}).format(date)
); // posible yes

// probar con node js
console.log(
	Intl.DateTimeFormat('es-419', {
		timeZone: 'America/Caracas',
		hour12: true,
		hourCycle: 'h12',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	}).format(date)
); // posible yes
