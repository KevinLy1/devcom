import { useState } from 'react';
import { Link } from 'react-router-dom';
import CommentReply from './CommentReply';
import useCommentReplies from '../../hooks/useCommentReplies';
import useAuth from '../../contexts/AuthContext';
import { IconButton, Button } from '@material-tailwind/react';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { apiDeleteComment } from '../../api/comments';
import moment from 'moment';
import CommentForm from '../Forms/CommentForm';
import CommentReplyForm from '../Forms/CommentReplyForm';
import { notification } from 'antd';
import validator from 'validator';

const Comment = (props) => {
  const { replies, replyAuthor } = useCommentReplies(props.idComment);
  const { userData } = useAuth();

  const [showReplyForm, setShowReplyForm] = useState(false);

  const toggleReplyForm = () => {
    if (userData) {
      setShowReplyForm(!showReplyForm);
    } else {
      notification.error({
        message: 'Vous devez vous connecter pour pouvoir répondre.'
      });
    }
  };

  const [showEditForm, setEditForm] = useState(false);

  const toggleEditForm = () => {
    setEditForm(!showEditForm);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer votre commentaire ?');

    if (confirmation) {
      try {
        const response = await apiDeleteComment(props.idComment);
        if (response.ok) {
          window.location.reload();
        } else {
          notification.error({
            message: 'Erreur lors de la suppression du commentaire'
          });
        }
      } catch {
        console.error('Erreur interne');
      }
    }
  };

  return (
    <>
      <div className="p-6 mb-6 text-base bg-gray-200 dark:bg-slate-950 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center flex-wrap">
            <Link to={`/user/${props.idUser}`} className="inline-flex items-center mr-3 text-sm">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src={
                  props.authorAvatar
                    ? `${process.env.REACT_APP_SERVER_UPLOADS_URL}/${props.authorAvatar}`
                    : '/assets/img/default-avatar.svg'
                }
                alt={props.author}
              />
              {props.author}
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
              <time>{props.dateCreation}</time>
            </p>
          </div>
          {userData && (
            <div className="flex gap-4">
              {userData.role === 'administrator' && (
                <Link className="hidden sm:block" to={`/admin/comment/${props.idComment}/edit`}>
                  <Button color="blue">Modérer</Button>
                </Link>
              )}
              {userData.id_user === props.idUser && (
                <>
                  <IconButton color="amber" onClick={toggleEditForm}>
                    <PencilSquareIcon strokeWidth={2.5} className="h-4 w-4" />
                  </IconButton>

                  <IconButton color="red" onClick={handleDelete}>
                    <TrashIcon strokeWidth={2.5} className="h-4 w-4" />
                  </IconButton>
                </>
              )}
            </div>
          )}
        </div>
        <p>{props.content}</p>
        {props.dateUpdate !== null && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            <time>Dernière édition : {props.dateUpdate}</time>
          </p>
        )}
        {showEditForm && <CommentForm editMode={true} currentComment={props.idComment} />}

        <div className="flex items-center mt-4 space-x-4">
          <button
            type="button"
            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
            onClick={toggleReplyForm}>
            <svg
              aria-hidden="true"
              className="mr-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            Répondre
          </button>
        </div>
        {showReplyForm && (
          <div>
            <CommentReplyForm parent={props.idComment} />
          </div>
        )}
      </div>
      {/* Affichage des réponses */}
      {replies.length > 0 &&
        replies.map((reply) => (
          <CommentReply
            key={reply.id_comment}
            idUser={reply.id_user}
            idComment={reply.id_comment}
            author={replyAuthor[reply.id_user]?.username || 'Utilisateur supprimé'}
            authorAvatar={replyAuthor[reply.id_user]?.avatar}
            content={reply.content ? validator.unescape(reply.content) : ''}
            dateCreation={moment(reply.date_creation).format('LLL')}
            dateUpdate={reply.date_update ? moment(reply.date_update).format('LLL') : null}
          />
        ))}
    </>
  );
};

export default Comment;
