import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiCommentById, apiCreateComment, apiUpdateComment } from '../../api/comments';
import useAuth from '../../contexts/AuthContext';
import moment from 'moment-timezone';
import { notification } from 'antd';
import validator from 'validator';

const CommentForm = ({ editMode, currentComment }) => {
  const { userData } = useAuth();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    id_user: userData.id_user,
    id_publication: id,
    content: ''
  });

  useEffect(() => {
    if (currentComment) {
      apiCommentById(currentComment)
        .then((response) => response.json())
        .then((data) => {
          setFormData((prevData) => ({
            ...prevData,
            content: data.content ? validator.unescape(data.content) : ''
          }));
        })
        .catch(() => {
          console.error('Erreur interne');
        });
    }
  }, [currentComment]);

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
          notification.success({
            placement: 'top',
            message: 'Commentaire ajouté'
          });

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          const error = await response.json();
          notification.error({
            placement: 'top',
            message: "Le commentaire n'a pas pu être ajouté.",
            description: error.message
          });
        }
      } else {
        const formDataWithDate = { ...formData, date_update: currentDate };
        const response = await apiUpdateComment(currentComment, formDataWithDate);
        if (response.ok) {
          notification.success({
            placement: 'top',
            message: 'Commentaire mis à jour'
          });

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          const error = await response.json();
          notification.error({
            placement: 'top',
            message: "Le commentaire n'a pas pu être édité.",
            description: error.message
          });
        }
      }
    } catch {
      console.error('Erreur interne');
    }
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      <div
        className={`py-2 px-4 mb-4 rounded-lg rounded-t-lg border border-gray-200 dark:border-slate-900 bg-gray-300 ${
          editMode ? ' dark:bg-slate-800' : ' dark:bg-slate-950'
        }`}>
        <label htmlFor="content" className="block mb-1 font-medium">
          {editMode ? 'Modifier le commentaire' : 'Ajouter un commentaire'}
        </label>
        <textarea
          id="content"
          rows="6"
          name="content"
          value={formData.content}
          className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
          placeholder="Écrire votre commentaire"
          onChange={handleChange}
          required></textarea>
      </div>
      <div className="flex justify-center">
        <button type="submit" className="px-4 py-2 rounded bg-slate-300 dark:bg-slate-950 focus-outline-none">
          {editMode ? 'Modifier' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
