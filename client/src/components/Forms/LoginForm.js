import { useState } from 'react';
import useAuth from '../../contexts/AuthContext';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

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
      const response = await login(formData);
      if (response === true) {
        notification.success({
          placement: 'top',
          message: 'Connexion réussie',
          description: `Bienvenue, ${formData.username} !`
        });
        navigate('/');
      } else {
        notification.error({
          placement: 'top',
          message: 'Erreur de connexion',
          description: response
        });
      }
    } catch {
      notification.error({
        placement: 'top',
        message: 'Erreur de connexion',
        description: "Une erreur s'est produite lors de la connexion"
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-6xl p-6 bg-white/90 dark:bg-slate-950/90 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-6">Formulaire de connexion</h2>

        <form onSubmit={handleSubmit}>
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

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 rounded bg-slate-300 dark:bg-slate-900 focus:outline-none">
              Connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
