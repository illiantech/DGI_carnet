import React from 'react';
import { describe, test, expect, beforeAll, afterEach, afterAll, beforeEach, vi } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { server } from '../mocks/node';
import userEvent from '@testing-library/user-event';
import { Form } from './form';
import 'intersection-observer';

describe('<Form/> Unit Test ', () => {
	let form;
	let mockHandle;
	let buttonForm;

	beforeEach(() => {
		cleanup();
		mockHandle = vi.fn();
		const mockref = { current: {} };
		const mockUserViews = { current: 0 };

		form = render(<Form controlQueryUsers={mockHandle} refSearch={mockref} userViews={mockUserViews} />);
		expect(form).toBeDefined();

		// acceder a DOM dentro de componente (cotainer necessary)
		buttonForm = form.container.querySelector('button');
	});

	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test('should indicate fields empty in Form', async () => {
		// buscar sin campos llenos

		await userEvent.click(buttonForm);

		const emptyFields = form.getByText('Rellene los campos');
		expect(emptyFields).toBeDefined();
	});

	test('should call once function controlsUser with MOCKS in form submit', async () => {
		// Testear cuantas veces se llama la funcion controlQuerysUsers con MOCKS

		const inputName = form.getByRole('searchbox');

		await userEvent.type(inputName, 'adara');

		await userEvent.click(buttonForm);

		expect(mockHandle).toHaveBeenCalledOnce();
	});
});
