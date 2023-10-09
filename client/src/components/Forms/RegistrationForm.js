import { useState } from 'react';
import { apiCreateUser } from '../../api/users';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { apiUploadAvatar } from '../../api/users';
import moment from 'moment-timezone';

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState(null);

  const [avatarFile, setAvatarFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  const handleConfirmPassword = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      notification.error({
        placement: 'top',
        message: "Erreur lors de l'inscription",
        description: 'Les mots de passe ne correspondent pas.'
      });
      return; // Sortir de la fonction handleSubmit() si ça ne correspond pas
    }

    const currentDate = moment().tz('Europe/Paris').format('YYYY-MM-DD HH:mm:ss');

    const formDataWithDate = { ...formData, date_registration: currentDate };

    try {
      const response = await apiCreateUser(formDataWithDate);
      if (response.ok) {
        if (avatarFile) {
          // Si un avatar a été sélectionné, préparez l'envoi du fichier
          const formDataWithAvatar = new FormData();
          formDataWithAvatar.append('avatar', avatarFile);

          const json = await response.json();
          const avatarResponse = await apiUploadAvatar(json.id_user, formDataWithAvatar);

          if (!avatarResponse.ok) {
            notification.error({
              placement: 'top',
              message: "Erreur pendant le chargement de l'avatar",
              description: json.message
            });
          }
        }
        notification.success({
          placement: 'top',
          message: 'Inscription réussie'
        });
        navigate('/login');
      } else {
        const json = await response.json();
        notification.error({
          placement: 'top',
          message: "Erreur lors de l'inscription",
          description: json.message
        });
      }
    } catch {
      notification.error({
        placement: 'top',
        message: "Erreur lors de l'inscription",
        description: "Une erreur s'est produite lors de l'inscription."
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-6xl p-6 bg-white/90 dark:bg-slate-950/90 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-6">Formulaire d'inscription</h2>

        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold mb-6">Informations obligatoires</h3>

          <div className="mb-4">
            <label htmlFor="username" className="block mb-1 font-medium">
              <span className="text-red-600">*</span> Nom d'utilisateur
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">
              <span className="text-red-600">*</span> Adresse e-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">
              <span className="text-red-600">*</span> Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">
              <span className="text-red-600">*</span> Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
              required
            />
          </div>

          <h3 className="text-xl font-semibold mb-6">Informations facultatives</h3>

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
            <label htmlFor="avatar" className="block mb-1 font-medium">
              Avatar
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept=".jpg, .jpeg, .gif, .png"
              onChange={handleFileChange}
              className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="px-4 py-2 rounded bg-slate-300 dark:bg-slate-900 focus:outline-none">
              Inscription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
