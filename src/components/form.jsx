/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { regInput } from '../resources/consts';

export function Form({ controlQueryUsers, submit, refSearch, userViews }) {
	const [emptyFields, setEmptyFields] = useState(false);
	const { createHandleSubmit } = useForm();

	const submitLoad = submit ? 'Cargando...' : 'Buscar';

	const changeInput = (e) => {
		const input = e.target;
		const name = input.name.split('F')[0];

		if (input.value.length > 0) input.classList.toggle('form-container--input__invalid', !regInput[name].test(input.value));
		else input.classList.remove('form-container--input__invalid');
	};

	return (
		<>
			{emptyFields && <span className="form--empty-fields">Rellene los campos</span>}
			<form
				aria-label="Buscar usuarios con o sin carnet"
				onSubmit={createHandleSubmit({ setEmptyFields, refSearch, controlQueryUsers, userViews, regInput })}
				className="form-container">
				<label title="Escribir cedula">
					Cédula:
					<input onChange={changeInput} className="form-container--input" min={1} placeholder="21543876" type="number" name="ciForm" />
				</label>

				<label title="Escribir nombre">
					Nombre:
					<input onChange={changeInput} className="form-container--input" maxLength={24} placeholder="Daniel" type="search" name="nameForm" />
				</label>

				<label title="Agregar fecha">
					Fecha:
					<input placeholder="aaaa-mm" className="form-container--input" type="month" name="dateForm" min="2022-01" />
				</label>

				<label title="Entregados">
					Entregados:
					<input className="form-container--input" name="checkForm" type="checkbox" />
				</label>

				<button className="form-container--submit" title={submitLoad} disabled={submit}>
					{submitLoad}
				</button>
			</form>
		</>
	);
}
