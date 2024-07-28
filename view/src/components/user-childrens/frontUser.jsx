
import React from "react";
import { userNameFormatted, userDateFormatted } from "../../resources/mapping";

// eslint-disable-next-line react/prop-types
export function FrontUser({ ci, date, name, children }) {
  return (
    <>
      <h3 className="user--title">Cédula</h3>
      <p className="user--content">{ci}</p>
      <h3 className="user--title">Nombre</h3>
      <p className="user--content">{userNameFormatted(name)}</p>
      <h3 className="user--title">Fecha</h3>
      <time className="user--content" dateTime={date}>
        {userDateFormatted(date)}
      </time>
      <h3 className="user--title">Entregado</h3>
      {children}
    </>
  );
}
