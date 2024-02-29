import { http, HttpResponse } from 'msw';

import { rootServer } from '../resources/consts';

const usersMock = [
	[
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
		}
	],
	2
];

// const allPosts = new Map();

export const handlers = [
	http.get(`${rootServer}/historial`, () => {
		// Note that you DON'T have to stringify the JSON!
		return HttpResponse.json(usersMock);
	}),
	http.delete(`${rootServer}/eliminados/:id`, ({ params }) => {
		const { id } = params;
		const res = usersMock[0].find((item) => item.id === Number(id));
		return HttpResponse.json(res);
	}),
	http.put(`${rootServer}/entregados/:id`, () => {
		return HttpResponse.json({ fecha_entregado: '2023-11-05T16:33:33.372Z' });
	}),
	http.put(`${rootServer}/descripciones/:id`, ({ params }) => {
		const { id } = params;
		return HttpResponse.json({ id, message: 'Descripción actualizada' });
	})
];
