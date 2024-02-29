import React from 'react';
import { describe, test, expect, beforeAll, afterEach, afterAll, beforeEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { server } from './mocks/node';
import userEvent from '@testing-library/user-event';
import App from './App';
import 'intersection-observer';

describe('<App/> E2E (should search items) ', () => {
	let sectionUser;
	let user;
	beforeEach(async () => {
		cleanup();
		render(<App />);

		const mockName = 'adara';

		// buscar input nombre
		const inputName = screen.getByRole('searchbox');
		const buttonForm = screen.getByText('Buscar');

		sectionUser = screen.getByRole('list');
		expect(sectionUser.children).toHaveLength(0);

		// Escribir en el formulario
		await userEvent.type(inputName, mockName);

		// Enviar formulario
		await userEvent.click(buttonForm);

		expect(sectionUser.children).toHaveLength(2);

		user = screen.getAllByRole('listitem')[0];
		expect(user).toBeDefined();

		// Esperar que exista componentes <frontUser/> <wrapperUser/>
		expect(screen.getAllByText('Cargo')).toBeDefined();
		expect(user.innerText).toMatch(mockName);
	});

	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test('should delete item', async () => {
		const buttonDeleteUserOne = screen.getAllByTitle('Borrar')[0];
		// Borrar un usuario
		await userEvent.click(buttonDeleteUserOne);
		expect(sectionUser.children).toHaveLength(1);
	});

	test('should update check item', async () => {
		expect(user.querySelector('.check-user').children).toHaveLength(1);

		const buttonCheckUser = screen.getAllByTitle('Confirmar entrega')[0];

		await userEvent.click(buttonCheckUser);

		const timeCheckUser = screen.getByTitle('Fecha de entrega');
		expect(timeCheckUser).toBeDefined();
		expect(user.querySelector('.check-user').children).toHaveLength(2);
	});

	test('should update description item', async () => {
		const textoDescrip = 'Descripción actualizada';

		const buttonWrapperUser = screen.getAllByTitle('Abrir pestaña')[0];

		await userEvent.click(buttonWrapperUser);

		const textareaUser = screen.getAllByPlaceholderText('Escribe una descripción del usuario en relación a su registro o entrega del carnet...')[0];

		const buttonDescripUser = screen.getAllByTitle('Enviar descripción')[0];

		await userEvent.type(textareaUser, textoDescrip);

		await userEvent.click(buttonDescripUser);

		const descripUser = screen.getByText('Descripción actualizada');
		expect(descripUser).toBeDefined();
		expect(user.querySelector('.descrip-wrapper').children).toHaveLength(2);
	});
});
