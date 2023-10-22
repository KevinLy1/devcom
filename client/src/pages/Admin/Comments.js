import { useState, useEffect } from 'react';
import useComments from '../../hooks/useComments';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-tailwind/react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { apiAdminDeleteComment } from '../../api/admin';
import { notification } from 'antd';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import validator from 'validator';

const AdminCommentsPage = () => {
  useDocumentTitle('Gestion des commentaires');

  const allComments = useComments();
  const [comments, setComments] = useState([]);

  const handleDelete = async (e, idComment) => {
    e.preventDefault();

    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?');

    if (confirmation) {
      try {
        const response = await apiAdminDeleteComment(idComment);
        if (response.ok) {
          notification.success({
            placement: 'top',
            message: 'La commentaire a bien été supprimé.'
          });

          setTimeout(() => {
            window.location.reload();
          }, 1000);
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

  useEffect(() => {
    if (allComments.length > 0) {
      setComments(allComments);
    }
  }, [allComments]);

  return (
    <>
      <h2 className="text-center text-3xl mb-5 font-bold">Gestion des commentaires</h2>

      <div className="min-w-full overflow-hidden border border-gray-300 dark:border-slate-700 rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="hidden sm:table-cell px-5 py-3 border-b-2 dark:border-slate-950 bg-gray-100 dark:bg-slate-950 text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                ID
              </th>
              <th className="px-5 py-3 border-b-2 dark:border-slate-950 bg-gray-100 dark:bg-slate-950 text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                Contenu
              </th>
              <th className="px-5 py-3 border-b-2 dark:border-slate-950 bg-gray-100 dark:bg-slate-950 text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-gray-50 dark:bg-slate-900' : 'bg-white dark:bg-slate-950'}>
                <td className="hidden sm:table-cell px-5 py-5 border-b border-gray-200 dark:border-slate-700 text-sm">
                  {comment.id_comment}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 dark:border-slate-700 text-sm">
                  {comment.content ? validator.unescape(comment.content) : ''}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 dark:border-slate-700 text-sm">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link to={`/admin/comment/${comment.id_comment}/edit`}>
                      <IconButton color="amber">
                        <FaPen />
                      </IconButton>
                    </Link>
                    <IconButton color="red" onClick={(e) => handleDelete(e, comment.id_comment)}>
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

export default AdminCommentsPage;
