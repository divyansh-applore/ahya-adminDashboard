import { API } from "../Backend";

// login
export const login = (data) => {
  return fetch(`${API}api/admin/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

// for setting token in localstorage
export const Authenticate = (data, next) => {
  if (typeof window != undefined) {
    localStorage.setItem("auth_token", JSON.stringify(data));
    next();
  }
};

// Token checking method
export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("auth_token")) {
    return JSON.parse(localStorage.getItem("auth_token"));
  } else {
    return false;
  }
};

// logout method
export const logout = (next) => {
  if (localStorage.getItem("auth_token")) {
    localStorage.removeItem("auth_token");

    next();

    return fetch(`${API}/logout`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }
};

// addMember
export const addMember = (data) => {
  console.log(data);
  return fetch(`${API}api/admin/add/member`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
};
