import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../contexts/AuthContext';
import { apiDeleteComment } from '../../api/comments';
import { IconButton } from '@material-tailwind/react';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import CommentReplyForm from '../Forms/CommentReplyForm';

const CommentReply = (props) => {
  const { userData } = useAuth();

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
        }
      } catch {
        //
      }
    }
  };

  return (
    <div className="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-slate-800">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <Link to={`/user/${props.idUser}`} className="inline-flex items-center mr-3 text-sm">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src={props.authorAvatar ? props.authorAvatar : '/assets/img/default-avatar.svg'}
              alt={props.author}
            />
            {props.author}
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time>{props.dateCreation}</time>
          </p>
        </div>
        {userData &&
          (userData.id_user === props.idUser ? (
            <div className="flex gap-4">
              <IconButton color="amber" onClick={toggleEditForm}>
                <PencilSquareIcon strokeWidth={2.5} className="h-4 w-4" />
              </IconButton>

              <IconButton color="red" onClick={handleDelete}>
                <TrashIcon strokeWidth={2.5} className="h-4 w-4" />
              </IconButton>
            </div>
          ) : null)}
      </div>
      <p>{props.content}</p>
      {props.dateUpdate !== null && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          <time>Édité le {props.dateUpdate}</time>
        </p>
      )}
      {showEditForm && <CommentReplyForm editMode={true} currentReply={props.idComment} />}
    </div>
  );
};

export default CommentReply;
