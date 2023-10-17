import { useEffect, useState } from 'react';
import {
  apiPublicationById,
  apiCreatePublication,
  apiUpdatePublication,
  apiAddPublicationCategory
} from '../../api/publications';
import useAuth from '../../contexts/AuthContext';
import moment from 'moment-timezone';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import useCategories from '../../hooks/useCategories';

const PublicationForm = ({ editMode, currentPublication }) => {
  const { userData } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id_user: userData.id_user,
    type: 'article'
  });

  const categories = useCategories();
  const [categoriesFormData, setCategoriesFormData] = useState({});

  useEffect(() => {
    if (currentPublication) {
      apiPublicationById(currentPublication)
        .then((response) => response.json())
        .then((data) => {
          setFormData((prevData) => ({
            ...prevData,
            title: data.title,
            type: data.type,
            description: data.description,
            content: data.content,
            image: data.image
          }));
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération de la publication :', error);
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
        selectedValues.push(options[i].value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = moment().tz('Europe/Paris').format('YYYY-MM-DD HH:mm:ss');

    try {
      if (!editMode) {
        const formDataWithDate = { ...formData, date_creation: currentDate };
        // Première étape : insérer
        const response = await apiCreatePublication(formDataWithDate);
        if (response.ok) {
          const json = await response.json();
          const newId = json.id_publication;

          // Deuxième étape : catégories
          if (categoriesFormData) {
            // Ajout des catégories à la publication
            categoriesFormData.id_category.forEach(async (categoryId) => {
              const categoryResponse = await apiAddPublicationCategory(newId, { id_category: categoryId });
              if (categoryResponse.ok) {
                console.log(`Catégorie ${categoryId} ajoutée avec succès à la publication ${newId}`);
              } else {
                console.error(`Erreur lors de l'ajout de la catégorie ${categoryId} à la publication ${newId}`);
              }
            });
          }

          // Troisième étape : image
          if (imageFile) {
            //
          }

          navigate(`/${formData.type}/${newId}`);
          window.location.reload();
        } else {
          notification.error({
            message: "La publication n'a pas pu être ajoutée."
          });
        }
      } else {
        const formDataWithDate = { ...formData, date_update: currentDate };
        const response = await apiUpdatePublication(currentPublication, formDataWithDate);
        if (response.ok) {
          navigate(`/${formData.type}/${currentPublication}`);
          window.location.reload();
        } else {
          notification.error({
            message: "La publication n'a pas pu être éditée."
          });
        }
      }
    } catch {
      //
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-6xl p-6 bg-white/90 dark:bg-slate-950/90 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-6">Ajouter une publication</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="type" className="block mb-1 font-medium">
              <span className="text-red-600">*</span> Type de publication
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
              required>
              <option value="article">Article</option>
              <option value="discussion">Discussion</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="categories" className="block mb-1 font-medium">
              <span className="text-red-600">*</span> Catégorie(s)
            </label>
            <select
              id="categories"
              name="categories"
              onChange={handleMultiSelectChange}
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

          <div className="flex justify-center">
            <button type="submit" className="px-4 py-2 rounded bg-slate-300 dark:bg-slate-900 focus:outline-none">
              Publier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublicationForm;
