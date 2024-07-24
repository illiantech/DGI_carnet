import { useCallback } from "react";
import { regInput } from "../resources/consts";

export function useForm() {
  const createHandleSubmit = useCallback(
    ({ setEmptyFields, refSearch, controlQueryUsers, userViews }) =>
      (e) => {
        e.preventDefault();

        const form = e.target;
        const fields = Object.fromEntries(new FormData(form));

        fields.nameForm = fields.nameForm.trim();
        fields.checkForm = Boolean(fields.checkForm);

        if (
          (!regInput.name.test(fields.nameForm) && fields.nameForm) ||
          (!regInput.ci.test(fields.ciForm) && fields.ciForm)
        )
          return;

        if (
          !fields.nameForm &&
          !fields.ciForm &&
          !fields.dateForm &&
          !fields.checkForm
        ) {
          setEmptyFields(true);
          return;
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
    [],
  );

  return { createHandleSubmit };
}
