import ADDRESS from "./Address";


function handleErrors(response) {
  if (!response.ok) {
    if(response.status === 401){
      localStorage.removeItem("bioprime-token");
      window.location.reload();
    }
    throw Error(response.statusText);
  }
  return response;
}

function parseJwt(token) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export default {
  isAuthenticated() {
    let token = localStorage.getItem("bioprime-token");
    return token != null;
  },

  getUserRole() {
    return parseJwt(localStorage.getItem("bioprime-token")).role;
  },


  getUsername() {
    let jwt = parseJwt(localStorage.getItem("bioprime-token"));
    return jwt.sub;
  },

  login(data, onSuccess, onFail) {
    const url = ADDRESS + "/auth/login";
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
        localStorage.setItem("bioprime-token", data);
        onSuccess();
      })
      .catch((error) => {
        console.error("Error:", error);
        onFail();
      });
  },

  changePassword(data, onSuccess, onFail) {
    const url = ADDRESS + "/auth/change-password";
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
          localStorage.setItem("bioprime-token", data);
          onSuccess();
        })
        .catch((error) => {
          console.error("Error: ", error);
          onFail();
        });
  },


  logout() {
    localStorage.removeItem("bioprime-token");
  },

  refreshToken() {
    const url = ADDRESS + "/auth/refresh";
    const response = fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "text/plain" },
      redirect: "error",
      referrerPolicy: "no-referrer",
      body: localStorage.getItem("bioprime-token"),
    });
    response
      .then(handleErrors)
      .then((response) => response.text())
      .then((data) => {
        localStorage.setItem("bioprime-token", data);
      });
  },

  addTokenToParameters(parameters) {
    return {
      ...parameters,
      headers: {
        ...parameters.headers,
        Authorization: "Bearer " + localStorage.getItem("bioprime-token"),
      },
    };
  },
};
