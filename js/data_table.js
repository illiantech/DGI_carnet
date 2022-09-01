const users = [
	{
		cedula: 28262997,
		Nombre: 'daniel',
		id: 1,
		fecha: '31-08-2022',
		entregado: true,
		Cargo: 'develoment web',
		Dependencia: 'familiar',
		descripcion: 'texto de ejemplo'
	},
	{
		cedula: 28234437,
		Nombre: 'karol',
		id: 1,
		fecha: '30-10-2022',
		entregado: false,
		Cargo: 'administrador',
		Dependencia: 'independiente',
		descripcion: 'segundo texto de ejemplo'
	},
	{
		cedula: 28234437,
		Nombre: 'karol',
		id: 1,
		fecha: '30-10-2022',
		entregado: false,
		Cargo: 'administrador',
		Dependencia: 'independiente',
		descripcion: 'segundo texto de ejemplo'
	},
	{
		cedula: 28234437,
		Nombre: 'karol',
		id: 1,
		fecha: '30-10-2022',
		entregado: false,
		Cargo: 'administrador',
		Dependencia: 'independiente',
		descripcion: 'segundo texto de ejemplo'
	},
	{
		cedula: 28234437,
		Nombre: 'karol',
		id: 1,
		fecha: '30-10-2022',
		entregado: false,
		Cargo: 'administrador',
		Dependencia: 'independiente',
		descripcion: 'segundo texto de ejemplo'
	},
	{
		cedula: 28234437,
		Nombre: 'karol',
		id: 1,
		fecha: '30-10-2022',
		entregado: false,
		Cargo: 'administrador',
		Dependencia: 'independiente',
		descripcion: 'segundo texto de ejemplo'
	}
];

// Funcion que genera de manera mas legible elementos

const $crE = (element) => document.createElement(element);

// funcion que generea dinamicamente los elementos de la lista de usuarios

const dataTable = (users) => {
	const Users = document.getElementById('Users');

	users.forEach((user) => {
		const containerUser = $crE('div');
		containerUser.classList.add('user');

		const titleCedula = $crE('h3');
		titleCedula.textContent = 'Cédula';

		const cedula = $crE('p');
		cedula.textContent = user.cedula;

		const titleNombre = $crE('h3');
		titleNombre.textContent = 'Nombre';

		const nombre = $crE('p');
		nombre.textContent = user.Nombre;

		const titleId = $crE('h3');
		titleId.textContent = 'ID';

		const id = $crE('p');
		id.textContent = user.id;

		const titleFecha = $crE('h3');
		titleFecha.textContent = 'Fecha';

		const fecha = $crE('p');
		fecha.textContent = user.fecha;

		const containerCheck = $crE('div');

		const check = $crE('div');
		check.classList.add('user--check');
		check.setAttribute('title', 'boton');
		check.setAttribute('data-check', user.entregado);

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
		cargo.textContent = user.Cargo;

		const dependencia = $crE('p');
		dependencia.textContent = user.Dependencia;

		const descripcion = $crE('p');
		descripcion.textContent = user.descripcion;

		dataWrapper.append(titleCargo, titleDependencia, titleDescripcion, cargo, dependencia, descripcion);

		containerUser.append(titleCedula, cedula, titleNombre, nombre, titleId, id, titleFecha, fecha, containerCheck, dataWrapper);

		Users.append(containerUser);
	});
};

dataTable(users);
