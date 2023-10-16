import useUser from '../hooks/useUser';
import Profile from '../components/Profile/Profile';
import useDocumentTitle from '../hooks/useDocumentTitle';
import moment from 'moment';
import 'moment/locale/fr';

const UserPage = () => {
  const user = useUser();

  useDocumentTitle(`Profil de ${user.username}`);

  return (
    <>
      <h1 className="text-4xl text-center mb-10 font-bold">Profil de {user.username}</h1>
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
};

export default UserPage;
