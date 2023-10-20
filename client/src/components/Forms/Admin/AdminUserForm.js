import { useState, useEffect } from 'react';
import { apiAdminUserById, apiAdminUpdateUser } from '../../../api/admin';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

const AdminUserForm = ({ currentUser }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    apiAdminUserById(currentUser)
      .then((response) => response.json())
      .then((data) => {
        setUser({
          username: data.username,
          email: data.email
        });
        setFormData((prevData) => ({
          ...prevData,
          gender: data.gender,
          first_name: data.first_name,
          last_name: data.last_name,
          biography: data.biography,
          skills: data.skills,
          web_url: data.web_url,
          role: data.role
        }));
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      });
  }, [currentUser]);

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
      const response = await apiAdminUpdateUser(currentUser, formData);
      if (response.ok) {
        notification.success({
          placement: 'top',
          message: 'Modification réussie'
        });
        navigate('/admin/users');
      } else {
        const json = await response.json();
        notification.error({
          placement: 'top',
          message: 'Erreur lors de la modification',
          description: json.message
        });
      }
    } catch {
      notification.error({
        placement: 'top',
        message: 'Erreur lors de la modification',
        description: "Une erreur s'est produite lors de la modification."
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-6xl p-6 bg-white/90 dark:bg-slate-950/90 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-6">Modification d'un utilisateur</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1 font-medium">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full p-2 border text-gray-500 dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
              disabled
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">
              Adresse e-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 border text-gray-500 dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
              disabled
            />
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block mb-1 font-medium">
              Civilité
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800">
              <option value="">-</option>
              <option value="M">Homme</option>
              <option value="F">Femme</option>
              <option value="O">Autre</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="first_name" className="block mb-1 font-medium">
              Prénom
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="last_name" className="block mb-1 font-medium">
              Nom de famille
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="web_url" className="block mb-1 font-medium">
              Site web
            </label>
            <input
              type="text"
              id="web_url"
              name="web_url"
              value={formData.web_url}
              onChange={handleChange}
              className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="biography" className="block mb-1 font-medium">
              Biographie (maximum 200 caractères)
            </label>
            <textarea
              type="text"
              id="biography"
              name="biography"
              value={formData.biography}
              onChange={handleChange}
              className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="skills" className="block mb-1 font-medium">
              Compétences
            </label>
            <textarea
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block mb-1 font-medium">
              Statut
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800">
              <option value="">-</option>
              <option value="administrator">Administrateur</option>
              <option value="user">Utilisateur</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button type="submit" className="px-4 py-2 rounded bg-slate-300 dark:bg-slate-900 focus:outline-none">
              Modifier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUserForm;
