export const mapData = (data) => {
	return data.map((user) => {
		return {
			name: user.Nombre,
			ci: user.cedula,
			date: user.fecha,
			deliveredDate: user.fecha_entregado,
			id: user.id,
			delivered: user.entregado,
			description: user.descripcion,
			position: user.Cargo,
			dependence: user.Dependencia,
			stade: user.estado
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
