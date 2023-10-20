import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiAdminCommentById, apiAdminUpdateComment, apiAdminDeleteComment } from '../../../api/admin';
import moment from 'moment-timezone';
import { notification } from 'antd';

const AdminCommentForm = ({ currentComment }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    apiAdminCommentById(currentComment)
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
      const formDataWithDate = { ...formData, date_update: currentDate };
      const response = await apiAdminUpdateComment(currentComment, formDataWithDate);
      if (response.ok) {
        notification.success({
          placement: 'top',
          message: 'Commentaire édité avec succès'
        });
        navigate('/admin/comments');
      } else {
        notification.error({
          placement: 'top',
          message: "Le commentaire n'a pas pu être édité."
        });
      }
    } catch {
      //
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?');

    if (confirmation) {
      try {
        const response = await apiAdminDeleteComment(currentComment);
        if (response.ok) {
          notification.success({
            placement: 'top',
            message: 'La commentaire a bien été supprimé.'
          });
          navigate('/admin/comments');
        }
      } catch (error) {
        notification.error({
          placement: 'top',
          message: "Une erreur s'est produite pendant la suppression",
          description: error
        });
      }
    }
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg border border-gray-200 dark:border-slate-900 bg-gray-300 dark:bg-slate-800">
        <label htmlFor="content" className="block mb-1 font-medium">
          Éditer le commentaire
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
      <div className="flex justify-center gap-3">
        <button type="submit" className="px-4 py-2 rounded bg-slate-300 dark:bg-slate-950 focus-outline-none">
          Modifier
        </button>
        <button className="px-4 py-2 rounded bg-red-500 focus-outline-none" onClick={handleDelete}>
          Supprimer
        </button>
      </div>
    </form>
  );
};

export default AdminCommentForm;
