export const objPUT = (data) => ({
	method: 'PUT',
	body: JSON.stringify({ data }),
	headers: {
		'Content-type': 'application/json'
	}
});

