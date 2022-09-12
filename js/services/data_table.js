// ruta de base de datos

export const rootServer = 'http://localhost:8000';

export const objPost = (entregado, fecha_entregado) => ({
	method: 'PUT',
	body: JSON.stringify({ entregado, fecha_entregado }),
	headers: {
		'Content-type': 'application/json'
	}
});

// Funcion que genera de manera mas legible elementos

export const $crE = (element) => document.createElement(element);

// Fecha de entrega que se genera solo si check es true

export const updateCheckDateTime = (dataText, $crE) => {
	const checkDateTime = $crE('div');
	checkDateTime.classList.add('user--check-dateTime');
	checkDateTime.setAttribute('title', 'Fecha de entrega');
	checkDateTime.textContent = new Date(dataText).toLocaleString();

	return checkDateTime;
};

// funcion que generea dinamicamente los elementos de la lista de usuarios

export default function dataTable(data, users, $crE, upDate) {
	users.innerHTML = '';

	data.forEach((user) => {
		const containerUser = $crE('div');
		containerUser.classList.add('user');

		const titleCedula = $crE('h3');
		titleCedula.textContent = 'Cédula';

		const cedula = $crE('p');
		cedula.textContent = user.cedula;

		const titleNombre = $crE('h3');
		titleNombre.textContent = 'Nombre';

		const nombre = $crE('p');
		nombre.textContent = user.Nombre.toLowerCase();

		const titleId = $crE('h3');
		titleId.textContent = 'ID';

		const id = $crE('p');
		id.textContent = user.id;

		const titleFecha = $crE('h3');
		titleFecha.textContent = 'Fecha';

		const fecha = $crE('p');
		fecha.textContent = user.fecha.slice(0, 10).split('-').reverse().join('/');

		const titleCheck = $crE('h3');
		titleCheck.textContent = 'Entregado';

		const containerCheck = $crE('div');

		const check = $crE('div');
		check.classList.add('user--check');
		check.setAttribute('title', 'boton');
		check.classList.toggle('user--check__active', user.entregado);

		if (user.fecha_entregado) check.append(upDate(user.fecha_entregado, $crE));

		containerCheck.append(check);

		const dataWrapper = $crE('div');
		dataWrapper.classList.add('user--data-wrapper');

		const titleCargo = $crE('h3');
		titleCargo.textContent = 'Cargo';

		const titleDependencia = $crE('h3');
		titleDependencia.textContent = 'Dependencia';

		const titleDescripcion = $crE('h3');
		titleDescripcion.textContent = 'Descripcion';

		const cargo = $crE('p');
		cargo.textContent = `${user.Cargo.slice(0, 1).toUpperCase()}${user.Cargo.slice(1).toLowerCase()}`;

		const dependencia = $crE('p');
		dependencia.textContent = `${user.Dependencia.slice(0, 1).toUpperCase()}${user.Dependencia.slice(1).toLowerCase()}`;

		const descripcion = $crE('p');
		if (user.descripcion) descripcion.textContent = `${user.descripcion.slice(0, 1).toUpperCase()}${user.descripcion.slice(1).toLowerCase()}`;
		else descripcion.textContent = 'Vacio';

		dataWrapper.append(titleCargo, cargo, titleDependencia, dependencia, titleDescripcion, descripcion);

		containerUser.append(titleCedula, cedula, titleNombre, nombre, titleId, id, titleFecha, fecha, titleCheck, containerCheck, dataWrapper);

		users.append(containerUser);
	});
}
