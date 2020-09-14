export const holoTools = () => {
  return fetch("https://api.holotools.app/v1/live")
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.error(error));
};
