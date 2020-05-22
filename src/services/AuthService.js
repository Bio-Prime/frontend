import ADDRESS from "./Address";

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export default {
  isAuthenticated() {
    return localStorage.getItem('bioprime-token') != null;
  },

  login(data, onSuccess, onFail) {
    const url = ADDRESS + "/auth/login";
    console.log(JSON.stringify(data));
    const response = fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      redirect: "error",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    response
      .then(handleErrors)
      .then((response) => response.text())
      .then((data) => {
        localStorage.setItem('bioprime-token', data);
        onSuccess();
      })
      .catch((error) => {
        console.error("Error:", error);
        onFail();
      });
  },

  logout() {
    localStorage.removeItem('bioprime-token');
  },

  refreshToken() {
    const url = ADDRESS + "/auth/refresh";
    console.log(JSON.stringify(localStorage.getItem('bioprime-token')));
    const response = fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "text/plain" },
      redirect: "error",
      referrerPolicy: "no-referrer",
      body: localStorage.getItem('bioprime-token'),
    });
    response
      .then(handleErrors)
      .then((response) => response.text())
      .then((data) => {
        localStorage.setItem('bioprime-token', data);
      });
  },

  addTokenToParameters(parameters) {
    return {
      ...parameters,
      headers: {
        ...parameters.headers,
        Authorization: "Bearer " + localStorage.getItem('bioprime-token'),
      },
    };
  },
};
