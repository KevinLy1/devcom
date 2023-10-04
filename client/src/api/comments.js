export const apiCreateComment = async (data) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/comments`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const apiDeleteComment = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/comments/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
};

export const apiCommentReplies = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/comments/${id}/replies`, {
    method: 'GET'
  });
};
