import { useEffect, useState } from 'react';
import { apiUploadImage, apiDeleteImage } from '../../api/images';
import { apiUserById, apiUpdateUser } from '../../api/users';
import { notification } from 'antd';
import useAuth from '../../contexts/AuthContext';

const ChangeAvatarForm = () => {
  const { userData } = useAuth();

  const [file, setFile] = useState(null);

  const [currentAvatar, setCurrentAvatar] = useState(null);

  useEffect(() => {
    apiUserById(userData.id_user)
      .then((response) => response.json())
      .then((data) => {
        setCurrentAvatar(data.avatar);
      })
      .catch(() => {
        console.error('Erreur interne');
      });
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', file);

    const uploadAvatar = async () => {
      const response = await apiUploadImage(formData);
      if (response.ok) {
        const data = await response.json();

        const update = await apiUpdateUser(userData.id_user, {
          avatar: data.imageName
        });
        if (update.ok) {
          notification.success({
            placement: 'top',
            message: "L'avatar a bien été mis à jour."
          });

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          const error = await update.json();
          notification.error({
            placement: 'top',
            message: "Erreur pendant la mise à jour de l'avatar",
            description: error.message
          });
        }
      } else {
        const error = await response.json();

        notification.error({
          placement: 'top',
          message: "Erreur pendant le chargement de l'image",
          description: error.message
        });
      }
    };

    try {
      if (currentAvatar) {
        const deleteResponse = await apiDeleteImage(currentAvatar);
        if (deleteResponse.ok) {
          uploadAvatar();
        }
      } else {
        uploadAvatar();
      }
    } catch (error) {
      notification.error({
        placement: 'top',
        message: 'Erreur',
        description: error.toString()
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-6xl p-6 bg-white/90 dark:bg-slate-950/90 rounded-2xl shadow">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="image" className="block mb-1 font-medium">
              <span className="text-red-600">*</span> Avatar (.jpg, .jpeg, .gif, .png)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept=".jpg, .jpeg, .gif, .png"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-2 border dark:border-gray-900 rounded bg-slate-50 dark:bg-slate-900 dark:focus:bg-slate-800"
            />
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

export default ChangeAvatarForm;
