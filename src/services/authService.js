/* eslint-disable no-throw-literal */
export async function login(authDetail) {
  const requestOptions = {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(authDetail),
  };

  const response = await fetch(`${process.env.REACT_APP_HOST}/login`, requestOptions);
  if (!response.ok) {
    throw {
      message: response.statusText,
      status: response.status,
    };
  }
  const data = await response.json();

  if (data.accessToken) {
    sessionStorage.setItem("email", JSON.stringify(data.user.email));
    sessionStorage.setItem("token", JSON.stringify(data.accessToken));
    sessionStorage.setItem("ccid", JSON.stringify(data.user.id));
  }
  return data;
}

export async function register(authDetail) {
  const requestOptions = {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(authDetail),
  };

  const response = await fetch(
    `${process.env.REACT_APP_HOST}/register`,
    requestOptions
  );
  if (!response.ok) {
    throw {
      message: response.statusText,
      status: response.status,
    };
  }
  const data = await response.json();

  if (data.accessToken) {
    sessionStorage.setItem("token", JSON.stringify(data.accessToken));
    sessionStorage.setItem("ccid", JSON.stringify(data.user.id));
    sessionStorage.setItem("email", JSON.stringify(data.user.email));
  }
  return data;
}

export function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("ccid");
  sessionStorage.removeItem("email");
}
