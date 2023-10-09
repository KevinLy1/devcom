import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiCreateComment } from '../../api/comments';
import useAuth from '../../contexts/AuthContext';
import moment from 'moment-timezone';

const CommentReplyForm = (props) => {
  const { userData } = useAuth();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    id_user: userData.id_user,
    id_publication: id,
    parent_comment: props.parent
  });

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

    const formDataWithDate = { ...formData, date_creation: currentDate };

    try {
      const response = await apiCreateComment(formDataWithDate);
      if (response.ok) {
        window.location.reload();
      }
    } catch {
      //
    }
  };

  return (
    <form className="mb-6" onSubmit={handleSubmit}>
      <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg border border-gray-200">
        <label htmlFor="content" className="block mb-1 font-medium">
          Ajouter un commentaire
        </label>
        <textarea
          id="content"
          rows="6"
          name="content"
          className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
          placeholder="Écrire votre commentaire"
          onChange={handleChange}
          required></textarea>
      </div>
      <div className="flex justify-center">
        <button type="submit" className="px-4 py-2 rounded bg-slate-300 dark:bg-slate-950 focus:outline-none">
          Ajouter
        </button>
      </div>
    </form>
  );
};

export default CommentReplyForm;
