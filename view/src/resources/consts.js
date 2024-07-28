export const rootServer = import.meta.env.VITE_ROOT_API ?? 'http://localhost:3001';

export const regInput = {
  ci: /^\d{5,10}$/,
  name: /^[a-zA-Z]+(\s([a-zA-Z]+))?(\s([a-zA-Z]+))?(\s([a-zA-Z]+))?$/
};
