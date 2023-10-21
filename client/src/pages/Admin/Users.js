import { useState, useEffect } from 'react';
import useUsers from '../../hooks/useUsers';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-tailwind/react';
import { FaBook, FaPen, FaTrash } from 'react-icons/fa';
import { apiAdminDeleteUser } from '../../api/admin';
import { notification } from 'antd';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import validator from 'validator';

const AdminUsersPage = () => {
  useDocumentTitle('Gestion des utilisateurs');

  const allUsers = useUsers();
  const [users, setUsers] = useState([]);

  const handleDelete = async (e, idUser) => {
    e.preventDefault();

    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');

    if (confirmation) {
      try {
        const response = await apiAdminDeleteUser(idUser);
        if (response.ok) {
          notification.success({
            placement: 'top',
            message: "L'utilisateur a bien été supprimé."
          });
          const updatedUsers = allUsers.filter((user) => user.id_user !== idUser);
          setUsers(updatedUsers);
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
    if (allUsers.length > 0) {
      setUsers(allUsers);
    }
  }, [allUsers]);

  return (
    <>
      <h2 className="text-center text-3xl mb-5 font-bold">Gestion des utilisateurs</h2>
      <div className="min-w-full overflow-hidden border border-gray-300 dark:border-slate-700 rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="hidden sm:table-cell px-5 py-3 border-b-2 dark:border-slate-950 bg-gray-100 dark:bg-slate-950 text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                ID
              </th>
              <th className="px-5 py-3 border-b-2 dark:border-slate-950 bg-gray-100 dark:bg-slate-950 text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                Utilisateur
              </th>
              <th className="hidden sm:table-cell px-5 py-3 border-b-2 dark:border-slate-950 bg-gray-100 dark:bg-slate-950 text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                Adresse e-mail
              </th>
              <th className="hidden sm:table-cell px-5 py-3 border-b-2 dark:border-slate-950 bg-gray-100 dark:bg-slate-950 text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-5 py-3 border-b-2 dark:border-slate-950 bg-gray-100 dark:bg-slate-950 text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-gray-50 dark:bg-slate-900' : 'bg-white dark:bg-slate-950'}>
                <td className="hidden sm:table-cell px-5 py-5 border-b border-gray-200 dark:border-slate-700 text-sm">
                  {user.id_user}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 dark:border-slate-700 text-sm">
                  <Link className="whitespace-no-wrap" to={`/user/${user.id_user}`}>
                    {user.username ? validator.unescape(user.username) : ''}
                  </Link>
                </td>
                <td className="hidden sm:table-cell px-5 py-5 border-b border-gray-200 dark:border-slate-700 text-sm">
                  <p className="text-gray-900 dark:text-gray-100 whitespace-no-wrap">{user.email}</p>
                </td>
                <td className="hidden sm:table-cell px-5 py-5 border-b border-gray-200 dark:border-slate-700 text-sm">
                  <p className="text-gray-900 dark:text-gray-100 whitespace-no-wrap">
                    {user.role === 'administrator' ? 'Administrateur' : 'Utilisateur'}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 dark:border-slate-700 text-sm">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link to={`/user/${user.id_user}`}>
                      <IconButton color="blue">
                        <FaBook />
                      </IconButton>
                    </Link>
                    <Link to={`/admin/user/${user.id_user}/edit`}>
                      <IconButton color="amber">
                        <FaPen />
                      </IconButton>
                    </Link>
                    <IconButton color="red" onClick={(e) => handleDelete(e, user.id_user)}>
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

export default AdminUsersPage;
