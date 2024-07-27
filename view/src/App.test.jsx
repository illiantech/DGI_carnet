import React from 'react';
import { describe, test, expect, beforeAll, afterEach, afterAll, beforeEach } from 'vitest';
import { screen, render, cleanup, waitFor } from '@testing-library/react';
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

    // Search input name
    const inputName = screen.getByRole('searchbox');
    const buttonForm = screen.getByText('Buscar');

    sectionUser = screen.getByRole('list');
    expect(sectionUser.children).toHaveLength(0);

    // Write in the form
    await userEvent.type(inputName, mockName);

    // Submit form
    await userEvent.click(buttonForm);

    await waitFor(() => expect(sectionUser.children).toHaveLength(2));

    user = screen.getAllByRole('listitem')[0];
    expect(user).toBeDefined();

    // Expect it exist <frontUser/> <wrapperUser/>
    expect(screen.getAllByText('Cargo')).toBeDefined();
    expect(user.innerText).toMatch(mockName);

    // synchronized intersection observer, it default async
    await waitFor(() => expect(sectionUser.children).toHaveLength(4));
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('should delete item', async () => {
    const buttonDeleteUserOne = screen.getAllByTitle('Borrar')[0];

    // Delete user
    await userEvent.click(buttonDeleteUserOne);
    await waitFor(() => expect(sectionUser.children).toHaveLength(3));
  });

  test('should update check item', async () => {
    expect(user.querySelector('.check-user').children).toHaveLength(1);

    const buttonCheckUser = screen.getAllByTitle('Confirmar entrega')[0];

    await userEvent.click(buttonCheckUser);

    await waitFor(() => expect(screen.getByTitle('Fecha de entrega')).toBeDefined());
    await waitFor(() => expect(user.querySelector('.check-user').children).toHaveLength(2));
  });

  test('should update description item', async () => {
    const textDescrip = 'Descripción actualizada';

    const buttonWrapperUser = screen.getAllByTitle('Abrir pestaña')[0];

    await userEvent.click(buttonWrapperUser);

    const textareaUser = screen.getAllByPlaceholderText('Escribe una descripción del usuario en relación a su registro o entrega del carnet...')[0];

    const buttonDescripUser = screen.getAllByTitle('Enviar descripción')[0];

    await userEvent.type(textareaUser, textDescrip);

    await userEvent.click(buttonDescripUser);

    await waitFor(() => expect(screen.getByText('Descripción actualizada')).toBeDefined());
    await waitFor(() => expect(user.querySelector('.descrip-wrapper').children).toHaveLength(2));
  });
});
