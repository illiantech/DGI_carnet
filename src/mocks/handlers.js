import { http, HttpResponse } from 'msw';

const users = [
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

export const handlers = [
	http.get('https://historial-carnets.guarico.gob.ve/historial', () => {
		// Note that you DON'T have to stringify the JSON!
		return HttpResponse.json(users);
	}),
	http.delete('https://historial-carnets.guarico.gob.ve/eliminados:id', (req) => {
		const { id } = req.params;
		// Note that you DON'T have to stringify the JSON!
		return HttpResponse.json(users[0].find((item) => item.id === id));
	}),
	http.put(' https://historial-carnets.guarico.gob.ve/entregados:id', (req) => {
		const { id } = req.params;
		// Note that you DON'T have to stringify the JSON!
		return HttpResponse.json(users[0].find((item) => item.id === id));
	})
];
