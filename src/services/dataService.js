/* eslint-disable no-throw-literal */
export async function getUser() {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const ccid = JSON.parse(sessionStorage.getItem("ccid"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/600/users/${ccid}`,
    requestOptions
  );
  if (!response.ok) {
   
    throw {
      message: response.statusText,
      status: response.status,
    };
  }
  const data = await response.json();
  return data;
}

export async function getUserOrders() {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const ccid = JSON.parse(sessionStorage.getItem("ccid"));
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/660/orders?user.id=${ccid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw  {
      message: response.statusText,
      status: response.status,
    };
  }
  const data = await response.json();
  return data;
}

export async function createOrder(cartList, total, user) {
  const token = JSON.parse(sessionStorage.getItem("token"));

  const order = {
    cartList: cartList,
    amount_paid: total,
    quantity: cartList.length,
    user: {
      name: user.name,
      email: user.email,
      id: user.id,
    },
  };
  const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    throw {
      message: response.statusText,
      status: response.status,
    };
  }
  const data = await response.json();
  return data;
}
