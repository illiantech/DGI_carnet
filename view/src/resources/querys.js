export const objPUT = (data) => ({
  method: 'PATCH',
  body: JSON.stringify({ data }),
  headers: {
    'Content-type': 'application/json'
  }
});
