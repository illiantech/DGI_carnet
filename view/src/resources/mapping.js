export const mapData = (data) => {
  return data.map((user) => {
    const { name, ci, date, deliveredDate, delivered, _id, description, position, dependence } = user;
    return {
      name,
      ci,
      date,
      deliveredDate,
      id: _id,
      delivered,
      description,
      position,
      dependence
    };
  });
};

export const deliveredDateFormatted = (deliveredDate) => {
  const deliveredDateFormatted = Intl.DateTimeFormat('es-419', {
    timeZone: 'America/Caracas',
    hour12: true,
    hourCycle: 'h12',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date(deliveredDate));

  return deliveredDateFormatted;
};

export const userTextFormatted = (text) => {
  if (!text) return;
  return `${text.slice(0, 1).toUpperCase()}${text.slice(1).toLowerCase()}`;
};

export const userNameFormatted = (name) => name.toLowerCase();
export const userDateFormatted = (date) => date.slice(0, 10).split('-').reverse().join('/');

export class ErrorConnect extends Error {
  constructor(message = 'Vuelvalo a intentar o revise su conexión') {
    super(message);
    this.name = 'Error de conexión o validación';
    this.stack = '';
  }
}
