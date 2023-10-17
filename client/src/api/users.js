export const apiUsers = async () => {
  return await fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: 'GET'
  });
};

export const apiUserById = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
    method: 'GET'
  });
};

export const apiCreateUser = async (data) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const apiUpdateUser = async (id, data) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const apiDeleteUser = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
};

export async function apiUploadAvatar(id, data) {
  return await fetch(`${process.env.REACT_APP_API_URL}/users/${id}/avatar`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: data
  });
}

export async function apiDeleteAvatar(id) {
  return await fetch(`${process.env.REACT_APP_API_URL}/users/${id}/avatar`, {
    method: 'DELETE',
    credentials: 'include'
  });
}

export const apiFavoritePublications = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/users/${id}/favorite-publications`, {
    method: 'GET',
    credentials: 'include'
  });
};

export const apiAddFavoritePublication = async (id, data) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/users/${id}/favorite-publications`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const apiDeleteFavoritePublication = async (id, data) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/users/${id}/favorite-publications`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};
