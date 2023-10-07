const API_DOMAIN = "http://localhost:3000/";

// GET
export const get = async (path) => {
  const response = await fetch(API_DOMAIN + path);
  const result = await response.json();
  return result;
};

// POST
export const post = async (path, options) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(options),
  });

  const result = await response.json();

  //
  return result;
};

// DEL
export const del = async (path, id) => {
  const response = await fetch(`${API_DOMAIN}${path}${id}`, {
    method: "DELETE",
  });

  const result = await response.json();
  //
  return result;
};

// PATCH
// options: data is need fix
export const patch = async (path, id, options) => {
  const response = await fetch(`${API_DOMAIN}${path}${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(options),
  });

  const result = await response.json();

  //
  return result;
};
