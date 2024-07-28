
import React from "react";
import { useDescrip } from "../../hooks/userDescrip";
import { EditIcon, CloudUploadIcon } from "../icons";

// eslint-disable-next-line react/prop-types
export function DescripWrapperUser({ description, id }) {
  const {
    refTextareaDescrip,
    textDescrip,
    setLoadDescrip,
    refElmtDescrip,
    loadDescrip,
  } = useDescrip({ description, id });

  const titleBtnDescrip = textDescrip
    ? "Editar descripción"
    : "Enviar descripción";

  const btnDescrip = () => {
    if (loadDescrip) return "...";
    return textDescrip ? <EditIcon /> : <CloudUploadIcon />;
  };

  const handleDescription = () => {
    setLoadDescrip(true);
  };

  return (
    <div className="descrip-wrapper">
      <button
        className="descrip-wrapper--button"
        title={titleBtnDescrip}
        onClick={handleDescription}
      >
        {btnDescrip()}
      </button>
      {textDescrip ? (
        <p className="descrip-wrapper--paragraph">{textDescrip}</p>
      ) : (
        <textarea
          className="descrip-wrapper--textEdit"
          defaultValue={refTextareaDescrip.current}
          ref={refElmtDescrip}
          placeholder="Escribe una descripción del usuario en relación a su registro o entrega del carnet..."
        ></textarea>
      )}
    </div>
  );
}
