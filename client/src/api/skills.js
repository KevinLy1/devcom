export const apiSkills = async () => {
  return await fetch(`${process.env.REACT_APP_API_URL}/skills`, {
    method: 'GET'
  });
};
