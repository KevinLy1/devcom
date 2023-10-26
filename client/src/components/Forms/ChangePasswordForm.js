import { useState } from 'react';
import { apiUpdateUser } from '../../api/users';
import { notification } from 'antd';
import useAuth from '../../contexts/AuthContext';

const ChangePasswordForm = () => {
  const { userData } = useAuth();

  const [formData, setFormData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleConfirmPassword = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password === confirmPassword) {
      try {
        const response = await apiUpdateUser(userData.id_user, formData);
        if (response.ok) {
          notification.success({
            placement: 'top',
            message: 'Mise à jour du mot de passe réussie',
            description: response.json().message
          });

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          const json = await response.json();
          notification.error({
            placement: 'top',
            message: 'Erreur lors du changement de mot de passe',
            description: json.message
          });
        }
      } catch {
        console.error('Erreur interne');
      }
    } else {
      notification.error({
        placement: 'top',
        message: 'Erreur lors du changement de mot de passe',
        description: 'Les mots de passe ne correspondent pas.'
      });
      return;
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-6xl p-6 bg-white/90 dark:bg-slate-950/90">
        <h2 className="text-2xl font-semibold mb-6">Changer le mot de passe</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="newPassword">
              <span className="text-red-600">*</span> Nouveau mot de passe
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
          <div>
            <label htmlFor="confirmNewPassword">
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
          <div className="flex justify-center">
            <button type="submit" className="mt-3 px-4 py-2 rounded bg-slate-300 dark:bg-slate-900 focus:outline-none">
              Changer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
