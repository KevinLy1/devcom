export const apiLogin = (data) => {
  return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
  });
};

export const apiLogout = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
    method: 'GET',
    credentials: 'include'
  });
};

export const apiDecodeJWT = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/auth/protected`, {
    method: 'GET',
    credentials: 'include'
  });
};

export const apiRefreshJWT = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
    method: 'GET',
    credentials: 'include'
  });
};
