import { useEffect, useState } from 'react';
import {
  apiAdminPublicationById,
  apiAdminUpdatePublication,
  apiAdminPublicationCategories,
  apiAdminRemovePublicationCategory,
  apiAdminAddPublicationCategory
} from '../../../api/admin';
import { apiUploadImage, apiDeleteImage } from '../../../api/images';
import moment from 'moment-timezone';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import useCategories from '../../../hooks/useCategories';
import validator from 'validator';

const AdminPublicationForm = ({ currentPublication }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const categories = useCategories();
  const [categoriesFormData, setCategoriesFormData] = useState({});
  const [existingCategories, setExistingCategories] = useState({});

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
            content: data.content ? validator.unescape(data.content) : '',
            image: data.image
          }));
        })
        .catch(() => {
          console.error('Erreur interne');
        });

      apiAdminPublicationCategories(currentPublication)
        .then((response) => response.json())
        .then((data) => {
          const selectedValues = [];
          for (let i = 0; i < data.length; i++) {
            selectedValues.push(data[i].id_category);
          }
          setCategoriesFormData((prevData) => ({
            ...prevData,
            id_category: selectedValues
          }));
          setExistingCategories((prevData) => ({
            ...prevData,
            id_category: selectedValues
          }));
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

  const handleMultiSelectChange = (e) => {
    const options = e.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(parseInt(options[i].value));
      }
    }

    setCategoriesFormData((prevFormData) => ({
      ...prevFormData,
      id_category: selectedValues
    }));
  };

  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const [deleteImage, setDeleteImage] = useState(false);

  const handleCheckboxChange = (e) => {
    setDeleteImage(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = moment().tz('Europe/Paris').format('YYYY-MM-DD HH:mm:ss');

    try {
      const formDataWithDate = { ...formData, date_update: currentDate };
      const response = await apiAdminUpdatePublication(currentPublication, formDataWithDate);
      if (response.ok) {
        if (categoriesFormData) {
          try {
            // Supprimer les catégories existantes
            for (const categoryId of existingCategories.id_category) {
              await apiAdminRemovePublicationCategory(currentPublication, { id_category: categoryId });
            }
            // Ajouter les nouvelles catégories à la publication
            for (const categoryId of categoriesFormData.id_category) {
              await apiAdminAddPublicationCategory(currentPublication, { id_category: categoryId });
            }
          } catch (error) {
            console.error(`Erreur lors de la mise à jour des catégories : ${error}`);
          }
        }

        if (imageFile) {
          const form = new FormData();
          form.append('image', imageFile);

          if (formData.image) await apiDeleteImage(formData.image);

          const upload = await apiUploadImage(form);
          if (upload.ok) {
            const data = await upload.json();

            await apiAdminUpdatePublication(currentPublication, {
              image: data.imageName
            });
          } else {
            const error = await upload.json();

            notification.error({
              placement: 'top',
              message: "Erreur pendant le chargement de l'image",
              description: error.message
            });
          }
        } else if (deleteImage) {
          try {
            const response = await apiDeleteImage(formData.image);
            if (response.ok) {
              await apiAdminUpdatePublication(currentPublication, {
                image: null
              });
            }
          } catch (error) {
            console.error('Erreur interne');
          }
        }
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
            <label htmlFor="categories" className="block mb-1 font-medium">
              <span className="text-red-600">*</span> Catégorie(s)
            </label>
            <select
              id="categories"
              name="categories"
              onChange={handleMultiSelectChange}
              value={categoriesFormData.id_category}
              className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
              multiple
              required>
              {categories.map((category) => (
                <option key={category.id_category} value={category.id_category}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

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

          <div className="mb-4">
            <label htmlFor="image" className="block mb-1 font-medium">
              Image
            </label>
            <input type="file" id="image" name="image" accept=".jpg, .jpeg, .gif, .png" onChange={handleFileChange} />
          </div>

          <div className="mb-4">
            <label>
              <input type="checkbox" checked={deleteImage} onChange={handleCheckboxChange} />
              Supprimer l'image
            </label>
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
