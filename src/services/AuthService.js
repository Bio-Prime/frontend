import ADDRESS from "./Address";

let token = null;

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export default {
  isAuthenticated() {
    return token != null;
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
        token = data;
        onSuccess();
      })
      .catch((error) => {
        console.error("Error:", error);
        onFail();
      });
  },

  logout() {
    token = null;
  },

  refreshToken() {
    const url = ADDRESS + "/auth/refresh";
    console.log(JSON.stringify(token));
    const response = fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "text/plain" },
      redirect: "error",
      referrerPolicy: "no-referrer",
      body: token,
    });
    response
      .then(handleErrors)
      .then((response) => response.text())
      .then((data) => {
        token = data;
      });
  },

  addTokenToParameters(parameters) {
    return {
      ...parameters,
      headers: {
        ...parameters.headers,
        Authorization: "Bearer " + token,
      },
    };
  },
};
