import { useState, useEffect } from 'react';
import usePublications from '../../hooks/usePublications';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-tailwind/react';
import { FaBook, FaPen, FaTrash } from 'react-icons/fa';
import { apiAdminDeletePublication } from '../../api/admin';
import { notification } from 'antd';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const AdminPublicationsPage = () => {
  useDocumentTitle('Gestion des publications');

  const allPublications = usePublications();
  const [publications, setPublications] = useState([]);

  const handleDelete = async (e, idPublication) => {
    e.preventDefault();

    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer la publication ?');

    if (confirmation) {
      try {
        const response = await apiAdminDeletePublication(idPublication);
        if (response.ok) {
          notification.success({
            message: 'La publication a bien été supprimée.'
          });
          const updatedPublications = allPublications.filter(
            (publication) => publication.id_publication !== idPublication
          );
          setPublications(updatedPublications);
        }
      } catch (error) {
        notification.error({
          message: "Une erreur s'est produite pendant la suppression",
          description: error
        });
      }
    }
  };

  useEffect(() => {
    if (allPublications.length > 0) {
      setPublications(allPublications);
    }
  }, [allPublications]);

  return (
    <>
      <h2 className="text-center text-3xl mb-5 font-bold">Gestion des publications</h2>
      <div className="min-w-full overflow-hidden border border-gray-300 dark:border-slate-700 rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 dark:border-slate-950 bg-gray-100 dark:bg-slate-950 text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                Publication
              </th>
              <th className="hidden sm:table-cell px-5 py-3 border-b-2 dark:border-slate-950 bg-gray-100 dark:bg-slate-950 text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                Type
              </th>
              <th className="px-5 py-3 border-b-2 dark:border-slate-950 bg-gray-100 dark:bg-slate-950 text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {publications.map((publication, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-gray-50 dark:bg-slate-900' : 'bg-white dark:bg-slate-950'}>
                <td className="px-5 py-5 border-b border-gray-200 dark:border-slate-700 text-sm">
                  <Link className="whitespace-no-wrap" to={`/${publication.type}/${publication.id_publication}`}>
                    {publication.title}
                  </Link>
                  <br />
                  <span className="italic">{publication.description}</span>
                </td>
                <td className="hidden sm:table-cell px-5 py-5 border-b border-gray-200 dark:border-slate-700 text-sm">
                  <p className="text-gray-900 dark:text-gray-100 whitespace-no-wrap">{publication.type}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 dark:border-slate-700 text-sm">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link to={`/${publication.type}/${publication.id_publication}`}>
                      <IconButton color="blue">
                        <FaBook />
                      </IconButton>
                    </Link>
                    <Link to={`/admin/publication/${publication.id_publication}/edit`}>
                      <IconButton color="amber">
                        <FaPen />
                      </IconButton>
                    </Link>
                    <IconButton color="red" onClick={(e) => handleDelete(e, publication.id_publication)}>
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

export default AdminPublicationsPage;
