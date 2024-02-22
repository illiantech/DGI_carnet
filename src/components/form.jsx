/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';

export function Form({ controlQueryUsers, submit, refSearch, userViews }) {
	const [emptyFields, setEmptyFields] = useState(false);
	const { createHandleSubmit } = useForm();

	const submitLoad = submit ? 'Cargando...' : 'Buscar';

	return (
		<>
			{emptyFields && <span className="form--empty-fields">Rellene los campos</span>}
			<form
				aria-label="Buscar usuarios con o sin carnet"
				onSubmit={createHandleSubmit({ setEmptyFields, refSearch, controlQueryUsers, userViews })}
				className="form-container">
				<label title="Escribir cedula">
					Cédula:
					<input className="form-container--input" placeholder="21543876" type="number" name="ciForm" />
				</label>

				<label title="Escribir nombre">
					Nombre:
					<input className="form-container--input" placeholder="Daniel" type="search" name="nameForm" />
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
