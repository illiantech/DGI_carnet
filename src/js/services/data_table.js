// ruta de base de datos

// export const rootServer = 'http://historial-carnets.guarico.gob.ve';

export const rootServer = 'http://localhost:8000';

// Funcion que genera de manera mas legible elementos

export const $crE = (element) => document.createElement(element);

// Obejeto body PUT

export const objPUT = (data) => ({
	method: 'PUT',
	body: JSON.stringify({ data }),
	headers: {
		'Content-type': 'application/json'
	}
});

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

// Description Edit or Text

export const updateDescription = (dataText, $crE) => {
	const fragment = document.createDocumentFragment();

	const descripBtn = $crE('button');
	descripBtn.setAttribute('data-btnDescrip', true);

	let descripEditOrText;

	if (!dataText) {
		descripBtn.setAttribute('title', 'Enviar');

		descripBtn.textContent = '📤';

		descripEditOrText = $crE('textarea');
		descripEditOrText.setAttribute('placeholder', 'Escribe una descripción del usuario en relación a su registro o entrega del carnet...');
	} else {
		descripBtn.setAttribute('title', 'Editar');

		descripBtn.textContent = '✏';

		descripEditOrText = $crE('p');
		descripEditOrText.textContent = dataText;
	}

	fragment.append(descripBtn, descripEditOrText);
	return fragment;
};

// funcion que generea dinamicamente los elementos de la lista de usuarios

export default function dataTable(dataTableParams, data, intersecting) {
	const [users, $crE, upDate, upDescrip] = dataTableParams;

	if (!intersecting) users.innerHTML = '';

	const fragment = document.createDocumentFragment();

	data.forEach((user) => {
		const containerUser = $crE('div');
		containerUser.classList.add('user');

		const deleteUser = $crE('div');
		deleteUser.classList.add('user--delete');
		deleteUser.setAttribute('title', 'Borrar');

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
		containerCheck.classList.add('user--check-container');

		const check = $crE('div');
		check.classList.add('user--check');

		if (user.entregado) check.setAttribute('title', 'Entrega confirmada');
		else check.setAttribute('title', 'Confirmar entrega');
		check.classList.toggle('user--check__active', user.entregado);

		if (user.fecha_entregado) check.append(upDate(user.fecha_entregado, $crE));

		containerCheck.append(check);

		const dataWrapper = $crE('div');
		dataWrapper.classList.add('user--wrapper-data');

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
		descripcion.classList.add('user--wrapper-description');

		descripcion.append(upDescrip(user.descripcion, $crE));

		dataWrapper.append(titleCargo, cargo, titleDependencia, dependencia, titleDescripcion, descripcion);

		const selectTitle = $crE('div');
		selectTitle.classList.add('user--select-title');
		selectTitle.setAttribute('id', 'titleSelect');

		const status = ['Activo', 'Inactivo', 'Extraviado'];

		selectTitle.textContent = status[user.estado];

		const selectWrapper = $crE('div');
		selectWrapper.classList.add('user--select-wrapper');

		const select = $crE('div');
		select.classList.add('user--select');
		select.setAttribute('id', 'userSelect');

		const activeSelect = $crE('div');
		activeSelect.setAttribute('data-value', 'active');
		activeSelect.textContent = 'Activo';

		const inactiveSelect = $crE('div');
		inactiveSelect.setAttribute('data-value', 'inactive');
		inactiveSelect.textContent = 'Inactivo';

		const strayedSelect = $crE('div');
		strayedSelect.setAttribute('data-value', 'strayed');
		strayedSelect.textContent = 'Extraviado';

		select.append(activeSelect, inactiveSelect, strayedSelect);

		selectWrapper.append(select);

		containerUser.append(
			deleteUser,
			titleCedula,
			cedula,
			titleNombre,
			nombre,
			titleId,
			id,
			titleFecha,
			fecha,
			titleCheck,
			containerCheck,
			dataWrapper,
			selectTitle,
			selectWrapper
		);

		fragment.append(containerUser);
	});

	users.append(fragment);
}

// GET historial

export const getHistorial = (getHistorialParams, userViews) => {
	const [ci, name, date, check] = getHistorialParams;

	return fetch(`${rootServer}/historial?cedula=${ci}&Nombre=${name}&fecha=${date}&entregado=${check}&userViews=${userViews}`)
		.then((res) => res.json())
		.then((res) => {
			console.log(res);
			return res;
		});
};

// Intersection Observer

export const setObserverData = (loadUser, getHistorial, dataTable, getHistorialParams, dataTableParams) => {
	let userViews = 0;

	const [users] = dataTableParams;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach(async (entry) => {
				if (entry.isIntersecting) {
					// dejar de observar el elemento anterior
					observer.unobserve(users.lastElementChild);

					loadUser.classList.add('load-user__active');

					userViews = userViews + 5;

					try {
						const data = await getHistorial(getHistorialParams, userViews);

						// Aqui tiene que ser la posicion 0 para que haga skip en las consultas, asi podemos saber cuando dejan de existir elementos para mostrar
						if (data[0].length > 0) {
							loadUser.classList.remove('load-user__active');

							dataTable(dataTableParams, data[0], entry.isIntersecting);

							observer.observe(users.lastElementChild);
						}

						loadUser.classList.remove('load-user__active');
					} catch (err) {
						alert(`Error de conexión\n${err}`);
					}
				}
			});
		},
		{ threshold: 0.5 }
	);

	observer.observe(users.lastElementChild);
};
