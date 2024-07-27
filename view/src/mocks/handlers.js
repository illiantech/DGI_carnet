import { http, HttpResponse } from 'msw';

import { rootServer } from '../resources/consts';

const usersMock = [
  {
    ci: '27238110',
    name: 'AdAra PimEntel',
    dependence: 'SIBCI GUÁRICO',
    position: 'OPERADOR MASTER',
    _id: 134,
    date: '2023-10-03T00:00:00.000Z',
    delivered: false,
    description: null,
    deliveredDate: '2023-10-03T16:33:33.372Z'
  },
  {
    ci: '28262778',
    name: 'AdAra roDriguez',
    dependence: 'servicios frio',
    position: 'mecanico',
    _id: 135,
    date: '2023-11-03T00:00:00.000Z',
    delivered: false,
    description: null,
    deliveredDate: '2023-11-05T16:33:33.372Z'
  },
  {
    ci: '2438110',
    name: 'AdAra castillo',
    dependence: 'Observer query',
    position: 'OPEdsdsRADOR MASTER',
    _id: 136,
    date: '2023-10-03T00:00:00.000Z',
    delivered: false,
    description: null,
    deliveredDate: '2023-10-03T16:33:33.372Z'
  },
  {
    ci: '67262778',
    name: 'AdAra perez',
    dependence: 'Observer query',
    position: 'mecaniereco',
    _id: 137,
    date: '2023-11-03T00:00:00.000Z',
    delivered: false,
    description: null,
    deliveredDate: '2023-11-05T16:33:33.372Z'
  }
];

// const allPosts = new Map();

export const handlers = [
  http.get(`${rootServer}/users`, ({ request }) => {
    const url = new URL(request.url);

    // Intersection Observer
    const userCount = +url.searchParams.get('userCount');

    let resUsers;
    if (userCount === 0) resUsers = usersMock.filter((_, index) => index < 2);
    else resUsers = usersMock.filter((_, index) => index >= 2);

    return HttpResponse.json([resUsers, 4]);
  }),
  http.delete(`${rootServer}/users/:id`, ({ params }) => {
    const { id } = params;
    const res = usersMock.find((item) => item._id === +id);
    return HttpResponse.json({ ...res, message: 'ELEMENTO ELIMINADO EN MOCK' });
  }),
  http.patch(`${rootServer}/users/:id`, ({ params }) => {
    const { id } = params;
    const res = usersMock.find((item) => item._id === +id);
    return HttpResponse.json({ ...res });
  })
];
