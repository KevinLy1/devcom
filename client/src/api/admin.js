// ************************************************ CRUD Users ************************************************
export const apiAdminUsers = async () => {
  return await fetch(`${process.env.REACT_APP_API_URL}/admin/users`, {
    method: 'GET',
    credentials: 'include'
  });
};

export const apiAdminUserById = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/admin/users/${id}`, {
    method: 'GET',
    credentials: 'include'
  });
};

export const apiAdminUpdateUser = async (id, data) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/admin/users/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const apiAdminDeleteUser = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/admin/users/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
};

// ************************************************ CRUD Categories ************************************************
export const apiAdminCategories = async () => {
  return await fetch(`${process.env.REACT_APP_API_URL}/admin/categories`, {
    method: 'GET',
    credentials: 'include'
  });
};

export const apiAdminCategoryById = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/admin/categories/${id}`, {
    method: 'GET',
    credentials: 'include'
  });
};

export const apiAdminCreateCategory = async (data) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/admin/categories`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const apiAdminUpdateCategory = async (id, data) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/admin/categories/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const apiAdminDeleteCategory = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/admin/categories/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
};

// ************************************************ CRUD Comments ************************************************
export const apiAdminComments = async () => {
  return await fetch(`${process.env.REACT_APP_API_URL}/admin/comments`, {
    method: 'GET',
    credentials: 'include'
  });
};

export const apiAdminCommentById = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/admin/comments/${id}`, {
    method: 'GET',
    credentials: 'include'
  });
};

export const apiAdminUpdateComment = async (id, data) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/admin/comments/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const apiAdminDeleteComment = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/admin/comments/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
};

// ************************************************ CRUD Publications ************************************************
export const apiAdminPublications = async () => {
  return await fetch(`${process.env.REACT_APP_API_URL}/admin/publications`, {
    method: 'GET',
    credentials: 'include'
  });
};

export const apiAdminPublicationById = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/admin/publications/${id}`, {
    method: 'GET',
    credentials: 'include'
  });
};

export const apiAdminUpdatePublication = async (id, data) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/admin/publications/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const apiAdminDeletePublication = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/admin/publications/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
};

// *************************************** Publication Categories ***************************************
export const apiAdminPublicationCategories = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/admin/publications/${id}/categories`, {
    method: 'GET',
    credentials: 'include'
  });
};

export const apiAdminAddPublicationCategory = async (id, data) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/admin/publications/${id}/categories`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const apiAdminRemovePublicationCategory = async (id, data) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/admin/publications/${id}/categories`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};
