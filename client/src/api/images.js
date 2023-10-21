export const apiUploadImage = async (formData) => {
  return fetch(`${process.env.REACT_APP_API_URL}/images`, {
    method: 'POST',
    credentials: 'include',
    body: formData
  });
};

export const apiDeleteImage = async (imageName) => {
  return fetch(`${process.env.REACT_APP_API_URL}/images/${imageName}`, {
    method: 'DELETE',
    credentials: 'include'
  });
};
