import { useEffect, useState } from 'react';
import { apiUserById } from '../api/users';
import { apiCommentReplies } from '../api/comments';

const useCommentReplies = (id) => {
  const [replies, setReplies] = useState({});
  const [replyAuthor, setReplyAuthor] = useState({});

  useEffect(() => {
    async function getReplies() {
      try {
        const response = await apiCommentReplies(id);
        if (response.ok) {
          const data = await response.json();
          setReplies(data);
        }
      } catch (error) {
        //
      }
    }

    getReplies();
  }, [id]);

  useEffect(() => {
    async function getRepliesData() {
      try {
        const usersData = {};
        for (const reply of replies) {
          if (!usersData[reply.id_user]) {
            const response = await apiUserById(reply.id_user);
            if (response.ok) {
              const replyAuthor = await response.json();
              usersData[reply.id_user] = replyAuthor;
            }
          }
        }
        setReplyAuthor(usersData);
      } catch (error) {
        //
      }
    }

    getRepliesData();
  }, [replies]);

  return { replies, replyAuthor };
};

export default useCommentReplies;
