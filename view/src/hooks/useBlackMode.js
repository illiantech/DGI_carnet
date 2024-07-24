import { useState, useEffect } from "react";

export function useBlackMode({ prefTheme }) {
  const [blackMode, setBlackMode] = useState(prefTheme);

  useEffect(() => {
    const mode = blackMode ? "dark" : "light";

    document.firstElementChild.setAttribute("data-theme", mode);
  }, [blackMode]);

  const handleBlackMode = () => {
    setBlackMode(!blackMode);
  };

  const classBlackMode = blackMode
    ? "black-mode black-mode__active"
    : "black-mode";

  const titileBlackMode = blackMode ? "Modo claro" : "Modo oscuro";

  return { handleBlackMode, classBlackMode, titileBlackMode, blackMode };
}
