export const objPUT = (data) => ({
  method: 'PACTH',
  body: JSON.stringify({ data }),
  headers: {
    'Content-type': 'application/json'
  }
});
