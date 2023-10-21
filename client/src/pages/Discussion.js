import useDocumentTitle from '../hooks/useDocumentTitle';
import useDiscussion from '../hooks/useDiscussion';
import Discussion from '../components/Blog/Discussion';
import Comment from '../components/Blog/Comment';
import CommentForm from '../components/Forms/CommentForm';
import useAuth from '../contexts/AuthContext';
import useFavorites from '../hooks/useFavorites';
import moment from 'moment';
import validator from 'validator';

const DiscussionPage = () => {
  const { discussion, discussionAuthor, categories, comments, reputations, commentAuthor, totalComments } =
    useDiscussion();

  const { userData } = useAuth();

  const favorites = useFavorites();

  useDocumentTitle(discussion.title);

  return (
    <>
      <section>
        <Discussion
          key={discussion.id_publication}
          title={discussion.title ? validator.unescape(discussion.title) : ''}
          categories={categories[discussion.id_publication] || []}
          reputation={reputations[discussion.id_publication] || []}
          isFavorite={favorites.some((favorite) => favorite.id_publication === discussion.id_publication)}
          description={discussion.description ? validator.unescape(discussion.description) : ''}
          content={discussion.content ? validator.unescape(discussion.content) : ''}
          image={discussion.image}
          idUser={discussion.id_user}
          author={discussionAuthor[discussion.id_user]?.username || 'Utilisateur supprimé'}
          authorAvatar={discussionAuthor[discussion.id_user]?.avatar}
          idPublication={discussion.id_publication}
          dateCreation={moment(discussion.date_creation).format('LLL')}
          dateUpdate={discussion.date_update ? moment(discussion.date_update).format('LLL') : null}
        />
      </section>
      <section id="comments">
        {comments.length > 0 && (
          <>
            <p className="my-3 font-semibold text-2xl">
              {totalComments} réponse{totalComments !== 1 ? 's' : ''}
            </p>
            {Object.values(comments).map((comment) => {
              return (
                <Comment
                  key={comment.id_comment}
                  idComment={comment.id_comment}
                  idUser={comment.id_user}
                  author={commentAuthor[comment.id_user]?.username || 'Utilisateur supprimé'}
                  authorAvatar={commentAuthor[comment.id_user]?.avatar}
                  content={comment.content ? validator.unescape(comment.content) : ''}
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

export default DiscussionPage;
