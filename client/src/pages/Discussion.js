import { useEffect, useState } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Discussion from '../components/Blog/Discussion';
import Comment from '../components/Blog/Comment';
import { apiUserById } from '../api/users';
import {
  apiPublicationById,
  apiPublicationCategories,
  apiPublicationComments
} from '../api/publications';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';
import { useNavigate } from 'react-router-dom';
import CommentForm from '../components/Forms/CommentForm';
import useAuth from '../contexts/AuthContext';

const DiscussionPage = () => {
  const { id } = useParams();
  const { userData } = useAuth();
  const navigate = useNavigate();

  const [article, setArticle] = useState({});
  const [articleAuthor, setArticleAuthor] = useState({});
  const [categories, setCategories] = useState({});
  const [comments, setComments] = useState({});
  const [commentAuthor, setCommentAuthor] = useState({});

  useEffect(() => {
    async function getArticle() {
      try {
        const response = await apiPublicationById(id);
        if (response.ok) {
          const publicationData = await response.json();
          // Trier les publications de type article uniquement
          if (publicationData.type === 'discussion') {
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
              const responseCategories = await apiPublicationCategories(
                publicationData.id_publication
              );
              const categoriesData = await responseCategories.json();
              setCategories((prevCategories) => ({
                ...prevCategories,
                [publicationData.id_publication]: categoriesData
              }));
            }
          } else {
            navigate('/discussions');
          }
        } else if (response.status === 404) {
          navigate('/discussions');
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
          setComments(data);
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
            const commentAuthor = await response.json();
            usersData[comment.id_user] = commentAuthor;
          }
        }
        setCommentAuthor(usersData);
      } catch (error) {
        //
      }
    }

    getCommentsData();
  }, [comments]);

  return (
    <>
      <section>
        <Discussion
          key={article.id_publication}
          title={article.title}
          categories={categories[article.id_publication] || []}
          description={article.description}
          content={article.content}
          image={article.image}
          idUser={article.id_user}
          author={articleAuthor[article.id_user]?.username}
          authorAvatar={articleAuthor[article.id_user]?.avatar}
          idPublication={article.id_publication}
          dateCreation={moment(article.date_creation).format('LLLL')}
          dateUpdate={moment(article.date_update).format('LLLL')}
        />
      </section>
      <section id="comments">
        {comments.length === 0 && 'Pas encore de commentaires'}
        {userData && <CommentForm />}
        {comments.length > 0 && (
          <>
            {comments.length} commentaires
            {Object.values(comments).map((comment) => {
              return (
                <Comment
                  key={comment.id_comment}
                  author={commentAuthor[comment.id_user]?.username}
                  content={comment.content}
                  dateCreation={moment(comment.date_creation).format('LLLL')}
                  dateUpdate={moment(comment.date_update).format('LLLL')}
                />
              );
            })}
          </>
        )}
      </section>
    </>
  );
};

export default DiscussionPage;
