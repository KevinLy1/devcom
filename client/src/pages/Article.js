import useDocumentTitle from '../hooks/useDocumentTitle';
import useArticle from '../hooks/useArticle';
import Article from '../components/Blog/Article';
import Comment from '../components/Blog/Comment';
import CommentForm from '../components/Forms/CommentForm';
import useAuth from '../contexts/AuthContext';
import useFavorites from '../hooks/useFavorites';
import moment from 'moment';

const ArticlePage = () => {
  const { article, articleAuthor, categories, comments, reputations, commentAuthor, totalComments } = useArticle();

  const { userData } = useAuth();

  const favorites = useFavorites();

  useDocumentTitle(article.title);

  return (
    <>
      <section>
        <Article
          key={article.id_publication}
          title={article.title}
          categories={categories[article.id_publication] || []}
          reputation={reputations[article.id_publication] || []}
          isFavorite={favorites.some((favorite) => favorite.id_publication === article.id_publication)}
          description={article.description}
          content={article.content}
          image={article.image}
          idUser={article.id_user}
          author={articleAuthor[article.id_user]?.username || 'Utilisateur supprimé'}
          authorAvatar={articleAuthor[article.id_user]?.avatar}
          idPublication={article.id_publication}
          dateCreation={moment(article.date_creation).format('LLL')}
          dateUpdate={article.date_update ? moment(article.date_update).format('LLL') : null}
        />
      </section>
      <section id="comments">
        {comments.length === 0 && 'Pas encore de commentaires'}
        {comments.length > 0 && (
          <>
            <p className="my-10 font-semibold text-2xl">
              {totalComments} commentaire{totalComments !== 1 ? 's' : ''}
            </p>
            {Object.values(comments)
              .reverse()
              .map((comment) => {
                return (
                  <Comment
                    key={comment.id_comment}
                    idComment={comment.id_comment}
                    idUser={comment.id_user}
                    author={commentAuthor[comment.id_user]?.username || 'Utilisateur supprimé'}
                    authorAvatar={commentAuthor[comment.id_user]?.avatar}
                    content={comment.content}
                    dateCreation={moment(comment.date_creation).format('LLL')}
                    dateUpdate={comment.date_update ? moment(comment.date_update).format('LLL') : null}
                  />
                );
              })}
          </>
        )}

        {userData && <CommentForm editMode={false} />}
      </section>
    </>
  );
};

export default ArticlePage;
