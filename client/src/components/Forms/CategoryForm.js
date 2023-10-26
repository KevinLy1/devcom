import { useState, useEffect } from 'react';
import { notification } from 'antd';
import { apiAdminCreateCategory, apiAdminCategoryById, apiAdminUpdateCategory } from '../../api/admin';
import { useNavigate } from 'react-router-dom';

const CategoryForm = ({ editMode, currentCategory }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (currentCategory) {
      apiAdminCategoryById(currentCategory)
        .then((response) => response.json())
        .then((data) => {
          setFormData((prevData) => ({
            ...prevData,
            title: data.title
          }));
        })
        .catch(() => {
          console.error('Erreur interne');
        });
    }
  }, [currentCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!editMode) {
        const response = await apiAdminCreateCategory(formData);
        if (response.ok) {
          notification.success({
            placement: 'top',
            message: 'Catégorie créée'
          });
          navigate('/admin/categories');
        } else {
          const error = await response.json();

          notification.error({
            placement: 'top',
            message: 'Erreur de création',
            description: error.message
          });
        }
      } else {
        const response = await apiAdminUpdateCategory(currentCategory, formData);
        if (response.ok) {
          notification.success({
            placement: 'top',
            message: 'Catégorie mise à jour'
          });
          navigate('/admin/categories');
        } else {
          const error = await response.json();

          notification.error({
            placement: 'top',
            message: 'Erreur de mise à jour',
            description: error.message
          });
        }
      }
    } catch {
      notification.error({
        placement: 'top',
        message: 'Erreur de création',
        description: "Une erreur s'est produite lors de la création"
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-6xl p-6 bg-white/90 dark:bg-slate-950/90 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-6">{!editMode ? 'Créer' : 'Éditer'} une catégorie</h2>

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

          <div className="flex justify-center">
            <button type="submit" className="px-4 py-2 rounded bg-slate-300 dark:bg-slate-900 focus:outline-none">
              {!editMode ? 'Créer' : 'Éditer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
