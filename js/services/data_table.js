// ruta de base de datos

export const rootServer = 'http://historial-carnets.guarico.gob.ve';

// Funcion que genera de manera mas legible elementos

export const $crE = (element) => document.createElement(element);

// Fecha de entrega que se genera solo si check es true

export const updateCheckDateTime = (dataText, $crE) => {
	const checkDateTime = $crE('p');
	checkDateTime.classList.add('user--check-dateTime');
	checkDateTime.setAttribute('title', 'Fecha de entrega');
	checkDateTime.textContent = Intl.DateTimeFormat('es-419', {
		timeZone: 'America/Caracas',
		hour12: true,
		hourCycle: 'h12',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	}).format(new Date(dataText));

	return checkDateTime;
};

// Body cuando se entrega check de fecha_entregado

export const objPutCheck = (entregado) => ({
	method: 'PUT',
	body: JSON.stringify({ entregado }),
	headers: {
		'Content-type': 'application/json'
	}
});

// Description ...

export const updateDescription = (dataText, $crE) => {
	const fragment = document.createDocumentFragment();

	const descripBtn = $crE('button');
	descripBtn.classList.add('description-edit--btn');

	const descripBtnElemt = $crE('div');

	if (!dataText) {
		descripBtn.setAttribute('title', 'Enviar');

		descripBtnElemt.textContent = '📤';

		const descripEditOrText = $crE('textarea');
		descripEditOrText.classList.add('description-edit--edit');
		descripEditOrText.setAttribute('placeholder', 'Escribe una descripción del usuario en relación a su registro o entrega del carnet...');
	} else {
		descripBtn.classList.add('description-edit--btn__text');
		descripBtn.setAttribute('title', 'Editar');

		descripBtnElemt.textContent = '✏';

		const descripEditOrText = $crE('p');
		descripEditOrText.classList.add('description-edit--text');
		descripEditOrText.textContent = dataText;
	}

	descripBtn.append(descripBtnElemt);

	return fragment.append(descripBtn, descripEditOrText);
};

// funcion que generea dinamicamente los elementos de la lista de usuarios

export default function dataTable(data, users, $crE, upDate, upDescrip) {
	users.innerHTML = '';

	const fragment = document.createDocumentFragment();

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
		check.setAttribute('title', 'Confirmar entrega');
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

		const descripcion = $crE('div');
		descripcion.classList.add('description-edit');

		descripcion.append(upDescrip(user.descripcion, $crE));

		dataWrapper.append(titleCargo, cargo, titleDependencia, dependencia, titleDescripcion, descripcion);

		containerUser.append(titleCedula, cedula, titleNombre, nombre, titleId, id, titleFecha, fecha, titleCheck, containerCheck, dataWrapper);

		fragment.append(containerUser);
	});

	users.append(fragment);
}
