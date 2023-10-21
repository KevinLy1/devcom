import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../contexts/AuthContext';
import { apiDeleteComment } from '../../api/comments';
import { IconButton, Button } from '@material-tailwind/react';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import CommentReplyForm from '../Forms/CommentReplyForm';
import { notification } from 'antd';

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
        } else {
          notification.error({
            message: 'Erreur lors de la suppression du commentaire'
          });
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
              src={
                props.authorAvatar
                  ? `${process.env.REACT_APP_SERVER_UPLOADS_URL}/${props.authorAvatar}`
                  : '/assets/img/default-avatar.svg'
              }
              alt={props.author}
            />
            {props.author}
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time>{props.dateCreation}</time>
          </p>
        </div>
        {userData && (
          <div className="flex gap-4">
            {userData.role === 'administrator' && (
              <Link to={`/admin/comment/${props.idComment}/edit`}>
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
          <time>Édité le {props.dateUpdate}</time>
        </p>
      )}
      {showEditForm && <CommentReplyForm editMode={true} currentReply={props.idComment} />}
    </div>
  );
};

export default CommentReply;
