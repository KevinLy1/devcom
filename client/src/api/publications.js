export const apiCreatePublication = async (data) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/publications`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const apiPublications = async () => {
  return await fetch(`${process.env.REACT_APP_API_URL}/publications`, {
    method: 'GET'
  });
};

export const apiPublicationById = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/publications/${id}`, {
    method: 'GET'
  });
};

export const apiLatestArticles = async () => {
  return await fetch(`${process.env.REACT_APP_API_URL}/publications/articles/latest`, {
    method: 'GET'
  });
};

export const apiLatestDiscussions = async () => {
  return await fetch(`${process.env.REACT_APP_API_URL}/publications/discussions/latest`, {
    method: 'GET'
  });
};

// UPDATE
export const apiUpdatePublication = async (id, data) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/publications/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

// DELETE
export const apiDeletePublication = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/publications/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
};

// *************************************** Publication Categories ***************************************

// CREATE
export const apiAddPublicationCategory = async (id, data) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/publications/${id}/categories`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

// READ
export const apiPublicationCategories = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/publications/${id}/categories`, {
    method: 'GET'
  });
};

// DELETE
export const apiRemovePublicationCategory = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/publications/${id}/categories`, {
    method: 'DELETE',
    credentials: 'include'
  });
};

// *************************************** Publication Reputation ***************************************
// CREATE
export const apiCreatePublicationReputation = async (id, data) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/publications/${id}/reputation`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

// READ
export const apiPublicationReputation = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/publications/${id}/reputation`, {
    method: 'GET'
  });
};

// UPDATE
export const apiUpdatePublicationReputation = async (id, data) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/publications/${id}/reputation`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

// DELETE
export const apiDeletePublicationReputation = async (id, data) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/publications/${id}/reputation`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

// *************************************** Publication Comments ***************************************

export const apiPublicationComments = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/publications/${id}/comments`, {
    method: 'GET'
  });
};
