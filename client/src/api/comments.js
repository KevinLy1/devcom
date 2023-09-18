// *************************************** Comment Replies ***************************************

export const apiCommentReplies = async (id) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/comments/${id}/replies`, {
    method: 'GET'
  });
};
