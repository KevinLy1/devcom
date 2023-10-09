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

const useArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState({});
  const [articleAuthor, setArticleAuthor] = useState({});
  const [categories, setCategories] = useState({});
  const [reputations, setReputations] = useState({});
  const [comments, setComments] = useState({});
  const [commentAuthor, setCommentAuthor] = useState({});
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    async function getArticle() {
      try {
        const response = await apiPublicationById(id);
        if (response.ok) {
          const publicationData = await response.json();
          // Trier les publications de type article uniquement
          if (publicationData.type === 'article') {
            setArticle(publicationData);

            if (!articleAuthor[publicationData.id_user]) {
              const responseUser = await apiUserById(publicationData.id_user);
              const userData = await responseUser.json();
              setArticleAuthor((prevUser) => ({
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
            navigate('/articles');
          }
        } else if (response.status === 404) {
          navigate('/articles');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }

    async function getArticleComments() {
      try {
        const response = await apiPublicationComments(id);
        if (response.ok) {
          const data = await response.json();
          setTotalComments(data.length);
          const parentComments = data.filter((comment) => comment.parent_comment === null);
          setComments(parentComments);
        }
      } catch (error) {
        // notification.error({
        //   message: 'Erreur lors de la récupération des commentaires',
        //   description: error
        // });
      }
    }

    getArticle();
    getArticleComments();
  }, [id]);

  useDocumentTitle(article.title);

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
      } catch (error) {
        //
      }
    }

    getCommentsData();
  }, [comments]);

  return {
    article,
    articleAuthor,
    categories,
    reputations,
    comments,
    commentAuthor,
    totalComments
  };
};

export default useArticle;
