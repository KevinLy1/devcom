import useProfile from '../../hooks/useProfile';
import Profile from '../../components/Profile/Profile';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import moment from 'moment';
import 'moment/locale/fr';
import { Button } from '@material-tailwind/react';
import { FaLock, FaPen, FaTrash } from 'react-icons/fa';
import { apiDeleteUser } from '../../api/users';
import { notification } from 'antd';
import useAuth from '../../contexts/AuthContext';

const ProfilePage = () => {
  const user = useProfile();
  const { logout } = useAuth();

  useDocumentTitle('Votre profil');

  const handleDelete = async (e) => {
    e.preventDefault();

    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ?');

    if (confirmation) {
      try {
        const response = await apiDeleteUser(user.id_user);
        if (response.ok) {
          notification.success({
            message: 'Votre compte a bien été supprimé'
          });
          await logout();
        }
      } catch {
        //
      }
    }
  };

  if (user) {
    return (
      <>
        <h1 className="text-4xl text-center mb-10 font-bold">Votre profil</h1>
        <div className="flex items-center flex-wrap justify-center gap-3 mb-10">
          <Button color="amber">
            <div className="flex items-center gap-2">
              <FaPen /> Éditer le profil
            </div>
          </Button>
          <Button color="blue">
            <div className="flex items-center gap-2">
              <FaLock /> Modifier le mot de passe
            </div>
          </Button>
          <Button color="red" onClick={handleDelete}>
            <div className="flex items-center gap-2">
              <FaTrash /> Supprimer le compte
            </div>
          </Button>
        </div>
        <Profile
          username={user.username}
          avatar={user.avatar}
          key={user.id_user}
          firstName={user.first_name}
          lastName={user.last_name}
          gender={user.gender}
          webUrl={user.web_url}
          email={user.email}
          dateRegistration={moment(user.date_registration).format('L')}
          biography={user.biography}
          role={user.role === 'administrator' ? 'Administrateur' : 'Utilisateur'}
        />
      </>
    );
  } else {
    return <p>Vous n'êtes pas connecté(e).</p>;
  }
};

export default ProfilePage;
