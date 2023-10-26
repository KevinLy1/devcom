import { useEffect, useState } from 'react';
import { apiAdminPublicationById, apiAdminUpdatePublication } from '../../../api/admin';
import moment from 'moment-timezone';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

const AdminPublicationForm = ({ currentPublication }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (currentPublication) {
      apiAdminPublicationById(currentPublication)
        .then((response) => response.json())
        .then((data) => {
          setFormData((prevData) => ({
            ...prevData,
            type: data.type,
            title: data.title ? validator.unescape(data.title) : '',
            description: data.description ? validator.unescape(data.description) : '',
            content: data.content ? validator.unescape(data.content) : ''
          }));
        })
        .catch(() => {
          console.error('Erreur interne');
        });
    }
  }, [currentPublication]);

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
      const response = await apiAdminUpdatePublication(currentPublication, formDataWithDate);
      if (response.ok) {
        navigate(`/${formData.type}/${currentPublication}`);
        window.location.reload();
      } else {
        const json = await response.json();
        notification.error({
          message: "La publication n'a pas pu être éditée.",
          description: json.message
        });
      }
    } catch {
      console.error('Erreur interne');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-6xl p-6 bg-white/90 dark:bg-slate-950/90 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-6">Éditer la publication</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-1 font-medium">
              <span className="text-red-600">*</span> Titre
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block mb-1 font-medium">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block mb-1 font-medium">
              <span className="text-red-600">*</span> Contenu de la publication
            </label>
            <textarea
              type="text"
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
              required
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="px-4 py-2 rounded bg-slate-300 dark:bg-slate-900 focus:outline-none">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPublicationForm;
