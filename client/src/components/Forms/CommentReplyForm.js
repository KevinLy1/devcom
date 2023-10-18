import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiCommentById, apiCreateComment, apiUpdateComment } from '../../api/comments';
import useAuth from '../../contexts/AuthContext';
import moment from 'moment-timezone';
import { notification } from 'antd';

const CommentReplyForm = ({ parent, editMode, currentReply }) => {
  const { userData } = useAuth();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    id_user: userData.id_user,
    id_publication: id,
    parent_comment: parent,
    content: ''
  });

  useEffect(() => {
    if (currentReply) {
      apiCommentById(currentReply)
        .then((response) => response.json())
        .then((data) => {
          setFormData((prevData) => ({
            ...prevData,
            content: data.content
          }));
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération du commentaire :', error);
        });
    }
  }, [currentReply]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = moment().tz('Europe/Paris').format('YYYY-MM-DD HH:mm:ss');

    try {
      if (!editMode) {
        const formDataWithDate = { ...formData, date_creation: currentDate };

        const response = await apiCreateComment(formDataWithDate);
        if (response.ok) {
          window.location.reload();
        } else {
          notification.error({
            message: "Le commentaire n'a pas pu être ajouté."
          });
        }
      } else {
        const formDataWithDate = { ...formData, date_update: currentDate };
        const response = await apiUpdateComment(currentReply, formDataWithDate);
        if (response.ok) {
          window.location.reload();
        } else {
          notification.error({
            message: "Le commentaire n'a pas pu être édité."
          });
        }
      }
    } catch {
      //
    }
  };

  return (
    <form className="mb-6" onSubmit={handleSubmit}>
      <div
        className={`py-2 px-4 mb-4 rounded-lg rounded-t-lg border border-gray-200 dark:border-slate-900 bg-gray-300 ${
          editMode ? ' dark:bg-slate-950' : ' dark:bg-slate-800'
        }`}>
        <label htmlFor="content" className="block mb-1 font-medium">
          {editMode ? 'Modifier la réponse' : 'Répondre à ce commentaire'}
        </label>
        <textarea
          id="content"
          rows="6"
          name="content"
          value={formData.content}
          className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
          placeholder="Écrire votre réponse"
          onChange={handleChange}
          required></textarea>
      </div>
      <div className="flex justify-center">
        <button type="submit" className="px-4 py-2 rounded bg-slate-300 dark:bg-slate-900 focus:outline-none">
          {editMode ? 'Modifier' : 'Répondre'}
        </button>
      </div>
    </form>
  );
};

export default CommentReplyForm;
