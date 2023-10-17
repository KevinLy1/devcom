import { useEffect, useState } from 'react';
import { apiUpdateUser } from '../../api/users';
import { notification } from 'antd';
import useAuth from '../../contexts/AuthContext';

const ChangeUserDataForm = ({ inputType, label, field, currentValue }) => {
  const { userData } = useAuth();

  const [formData, setFormData] = useState({ [field]: currentValue || '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  useEffect(() => {
    if (currentValue) {
      setFormData((prevData) => ({
        ...prevData,
        [field]: currentValue
      }));
    }
  }, [currentValue, field]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiUpdateUser(userData.id_user, formData);
      if (response.ok) {
        notification.success({
          placement: 'top',
          message: 'Mise à jour réussie'
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const json = await response.json();
        notification.error({
          placement: 'top',
          message: 'Erreur lors de la mise à jour',
          description: json.message
        });
      }
    } catch {
      notification.error({
        placement: 'top',
        message: 'Erreur lors de la mise à jour',
        description: "Une erreur s'est produite lors de la mise à jour."
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-6xl p-6 bg-white/90 dark:bg-slate-950/90 rounded-2xl shadow">
        <form onSubmit={handleSubmit}>
          {field === 'gender' ? (
            <div className="mb-4">
              <label htmlFor={formData.field} className="block mb-1 font-medium">
                {label}
              </label>
              <select
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800">
                <option value="">-</option>
                <option value="M">Homme</option>
                <option value="F">Femme</option>
                <option value="O">Autre</option>
              </select>
            </div>
          ) : field === 'biography' || field === 'skills' ? (
            <div className="mb-4">
              <label htmlFor="biography" className="block mb-1 font-medium">
                {label}
              </label>
              <textarea
                type={inputType}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
              />
            </div>
          ) : (
            <div className="mb-4">
              <label htmlFor={field} className="block mb-1 font-medium">
                <span className="text-red-600">*</span> {label}
              </label>
              <input
                type={inputType}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
              />
            </div>
          )}

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

export default ChangeUserDataForm;
