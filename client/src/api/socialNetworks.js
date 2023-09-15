export const apiSocialNetworks = async () => {
  return await fetch(`${process.env.REACT_APP_API_URL}/social-networks`, {
    method: 'GET'
  });
};
