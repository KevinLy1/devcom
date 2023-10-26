import { useEffect, useState } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { apiUserById } from '../api/users';
import {
  apiPublicationById,
  apiPublicationCategories,
  apiPublicationComments,
  apiPublicationReputation
} from '../api/publications';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const useDiscussion = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [discussion, setDiscussion] = useState({});
  const [discussionAuthor, setDiscussionAuthor] = useState({});
  const [categories, setCategories] = useState({});
  const [reputations, setReputations] = useState({});
  const [comments, setComments] = useState({});
  const [commentAuthor, setCommentAuthor] = useState({});
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    async function getDiscussion() {
      try {
        const response = await apiPublicationById(id);
        if (response.ok) {
          const publicationData = await response.json();
          // Trier les publications de type discussion uniquement
          if (publicationData.type === 'discussion') {
            setDiscussion(publicationData);

            if (!discussionAuthor[publicationData.id_user]) {
              const responseUser = await apiUserById(publicationData.id_user);
              const userData = await responseUser.json();
              setDiscussionAuthor((prevUser) => ({
                ...prevUser,
                [publicationData.id_user]: userData
              }));
            }

            if (!categories[publicationData.id_publication]) {
              const responseCategories = await apiPublicationCategories(publicationData.id_publication);
              const categoriesData = await responseCategories.json();
              setCategories((prevCategories) => ({
                ...prevCategories,
                [publicationData.id_publication]: categoriesData
              }));
            }

            if (!reputations[publicationData.id_publication]) {
              const responseReputations = await apiPublicationReputation(publicationData.id_publication);
              const reputationsData = await responseReputations.json();
              setReputations((prevReputations) => ({
                ...prevReputations,
                [publicationData.id_publication]: reputationsData
              }));
            }
          } else {
            navigate('/discussions');
          }
        } else if (response.status === 404) {
          navigate('/discussions');
        }
      } catch {
        console.error('Erreur interne');
      }
    }

    async function getDiscussionComments() {
      try {
        const response = await apiPublicationComments(id);
        if (response.ok) {
          const data = await response.json();
          setTotalComments(data.length);
          const parentComments = data.filter((comment) => comment.parent_comment === null);
          setComments(parentComments);
        }
      } catch {
        console.error('Erreur interne');
      }
    }

    getDiscussion();
    getDiscussionComments();
  }, [id]);

  useDocumentTitle(discussion.title);

  useEffect(() => {
    async function getCommentsData() {
      try {
        const usersData = {};
        for (const comment of comments) {
          if (!usersData[comment.id_user]) {
            const response = await apiUserById(comment.id_user);
            if (response.ok) {
              const commentAuthor = await response.json();
              usersData[comment.id_user] = commentAuthor;
            }
          }
        }
        setCommentAuthor(usersData);
      } catch {
        console.error('Erreur interne');
      }
    }

    getCommentsData();
  }, [comments]);

  return {
    discussion,
    discussionAuthor,
    categories,
    reputations,
    comments,
    commentAuthor,
    totalComments
  };
};

export default useDiscussion;
