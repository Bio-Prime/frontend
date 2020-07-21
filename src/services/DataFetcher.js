import ADDRESS from "./Address";
import AuthService from "./AuthService";

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

export default {
  async get(path) {
    const url = ADDRESS + path;

    let params = {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "error",
      referrerPolicy: "no-referrer",
    };

    const response = await fetch(url, AuthService.addTokenToParameters(params));
    const response_1 = await handleErrors(response);
    return response_1.json();
  },
  async post(path,data) {
    const url = ADDRESS + path;

    let params = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "error",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    };

    const response = await fetch(url, AuthService.addTokenToParameters(params));
    const response_1 = await handleErrors(response);
    return response_1.json();
  },
  async postNoReturn(path,data) {
    const url = ADDRESS + path;

    let params = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "error",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    };

    const response = await fetch(url, AuthService.addTokenToParameters(params));
    const response_1 = await handleErrors(response);
    return response_1;
  },
  async postRawDataNoReturn(path,data) {
    const url = ADDRESS + path;

    let params = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "error",
      referrerPolicy: "no-referrer",
      body: data,
    };

    const response = await fetch(url, AuthService.addTokenToParameters(params));
    const response_1 = await handleErrors(response);
    return response_1;
  },
};
