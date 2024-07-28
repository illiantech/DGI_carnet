
import React from "react";
import { ClickIcon } from "../icons";

// eslint-disable-next-line react/prop-types
export function ButtonWrapperUser({ setViewWrapper, titleButtonWrapper }) {
  const handleClickWrapper = () => {
    setViewWrapper((prevState) => !prevState);
  };

  return (
    <button
      title={titleButtonWrapper}
      className="button-wrapper"
      onClick={handleClickWrapper}
    >
      <div className="button-wrapper--container">
        <ClickIcon />
      </div>
    </button>
  );
}
