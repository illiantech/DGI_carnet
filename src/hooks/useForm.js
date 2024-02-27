import { useCallback } from 'react';
import { ErrorForm } from '../resources/mapping';

export function useForm() {
	const createHandleSubmit = useCallback(
		({ setEmptyFields, refSearch, controlQueryUsers, userViews, regInput }) =>
			(e) => {
				e.preventDefault();

				const form = e.target;
				const fields = Object.fromEntries(new FormData(form));

				fields.nameForm = fields.nameForm.trim();
				fields.checkForm = Boolean(fields.checkForm);

				if ((!regInput.name.test(fields.nameForm) && fields.nameForm) || (!regInput.ci.test(fields.ciForm) && fields.ciForm))
					throw new ErrorForm('Valores no permitidos \n ingrese valores compatibles ');

				if (!fields.nameForm && !fields.ciForm && !fields.dateForm && !fields.checkForm) {
					setEmptyFields(true);
					throw new ErrorForm('Campos vacios \n Ingrese datos en al menos uno de los inputs');
				}

				setEmptyFields(false);

				if (JSON.stringify(fields) === JSON.stringify(refSearch.current)) {
					form.reset();
					return;
				}

				refSearch.current = fields;

				controlQueryUsers({ fields, form });

				userViews.current = 0;
			},
		[]
	);

	return { createHandleSubmit };
}
