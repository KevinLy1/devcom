import { useState, useEffect } from 'react';
import useCategories from '../../hooks/useCategories';
import { Link } from 'react-router-dom';
import { IconButton, Button } from '@material-tailwind/react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { apiAdminDeleteCategory } from '../../api/admin';
import { notification } from 'antd';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const AdminCategoriesPage = () => {
  useDocumentTitle('Gestion des catégories');

  const allCategories = useCategories();
  const [categories, setCategories] = useState([]);

  const handleDelete = async (e, idCategory) => {
    e.preventDefault();

    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?');

    if (confirmation) {
      try {
        const response = await apiAdminDeleteCategory(idCategory);
        if (response.ok) {
          notification.success({
            placement: 'top',
            message: 'La catégorie a bien été supprimée.'
          });
          const updatedCategories = allCategories.filter((category) => category.id_category !== idCategory);
          setCategories(updatedCategories);
        }
      } catch {
        notification.error({
          placement: 'top',
          message: "Une erreur s'est produite pendant la suppression"
        });
      }
    }
  };

  useEffect(() => {
    if (allCategories.length > 0) {
      setCategories(allCategories);
    }
  }, [allCategories]);

  return (
    <>
      <h2 className="text-center text-3xl mb-5 font-bold">Gestion des catégories</h2>

      <div className="mb-3">
        <Link to="/admin/category/new">
          <Button>Créer une nouvelle catégorie</Button>
        </Link>
      </div>

      <div className="min-w-full overflow-hidden border border-gray-300 dark:border-slate-700 rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="hidden sm:table-cell px-5 py-3 border-b-2 dark:border-slate-950 bg-gray-100 dark:bg-slate-950 text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                ID
              </th>
              <th className="px-5 py-3 border-b-2 dark:border-slate-950 bg-gray-100 dark:bg-slate-950 text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                Titre
              </th>
              <th className="px-5 py-3 border-b-2 dark:border-slate-950 bg-gray-100 dark:bg-slate-950 text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-gray-50 dark:bg-slate-900' : 'bg-white dark:bg-slate-950'}>
                <td className="hidden sm:table-cell px-5 py-5 border-b border-gray-200 dark:border-slate-700 text-sm">
                  {category.id_category}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 dark:border-slate-700 text-sm">
                  <Link className="whitespace-no-wrap" to={`/category/${category.id_category}`}>
                    {category.title}
                  </Link>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 dark:border-slate-700 text-sm">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link to={`/admin/category/${category.id_category}/edit`}>
                      <IconButton color="amber">
                        <FaPen />
                      </IconButton>
                    </Link>
                    <IconButton color="red" onClick={(e) => handleDelete(e, category.id_category)}>
                      <FaTrash />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminCategoriesPage;
