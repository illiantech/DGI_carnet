import { http, HttpResponse } from 'msw';

import { rootServer } from '../resources/consts';

const usersMock = [
	{
		cedula: '27238110',
		Nombre: 'AdAra PimEntel',
		Dependencia: 'SIBCI GUÁRICO',
		Cargo: 'OPERADOR MASTER',
		id: 134,
		fecha: '2023-10-03T00:00:00.000Z',
		entregado: false,
		descripcion: null,
		fecha_entregado: '2023-10-03T16:33:33.372Z',
		estado: 0
	},
	{
		cedula: '28262778',
		Nombre: 'AdAra roDriguez',
		Dependencia: 'servicios frio',
		Cargo: 'mecanico',
		id: 135,
		fecha: '2023-11-03T00:00:00.000Z',
		entregado: false,
		descripcion: null,
		fecha_entregado: '2023-11-05T16:33:33.372Z',
		estado: 0
	},
	{
		cedula: '2438110',
		Nombre: 'AdAra castillo',
		Dependencia: 'Observer query',
		Cargo: 'OPEdsdsRADOR MASTER',
		id: 136,
		fecha: '2023-10-03T00:00:00.000Z',
		entregado: false,
		descripcion: null,
		fecha_entregado: '2023-10-03T16:33:33.372Z',
		estado: 0
	},
	{
		cedula: '67262778',
		Nombre: 'AdAra perez',
		Dependencia: 'Observer query',
		Cargo: 'mecaniereco',
		id: 137,
		fecha: '2023-11-03T00:00:00.000Z',
		entregado: false,
		descripcion: null,
		fecha_entregado: '2023-11-05T16:33:33.372Z',
		estado: 0
	}
];

// const allPosts = new Map();

export const handlers = [
	http.get(`${rootServer}/historial`, ({ request }) => {
		const url = new URL(request.url);

		// Intersection Observer
		const userViews = Number(url.searchParams.get('userViews'));

		let resUsers;
		if (userViews === 0) resUsers = usersMock.filter((_, index) => index < 2);
		else resUsers = usersMock.filter((_, index) => index >= 2);

		return HttpResponse.json([resUsers, 4]);
	}),
	http.delete(`${rootServer}/eliminados/:id`, ({ params }) => {
		const { id } = params;
		const res = usersMock.find((item) => item.id === Number(id));
		return HttpResponse.json({ ...res, message: 'ELEMENTO ELIMINADO EN MOCK' });
	}),
	http.put(`${rootServer}/entregados/:id`, () => {
		return HttpResponse.json({ fecha_entregado: '2023-11-05T16:33:33.372Z' });
	}),
	http.put(`${rootServer}/descripciones/:id`, ({ params }) => {
		const { id } = params;

		return HttpResponse.json({ id, message: 'Descripción actualizada' });
	})
];
