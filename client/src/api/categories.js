export const apiCategories = async () => {
  return await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
    method: 'GET'
  });
};

export const apiCategoryById = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/categories/${id}`, {
    method: 'GET'
  });
};

export const apiPublicationsByCategory = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/categories/${id}/publications`, {
    method: 'GET'
  });
};
