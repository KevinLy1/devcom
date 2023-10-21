import useUser from '../hooks/useUser';
import User from '../components/Blog/User';
import useDocumentTitle from '../hooks/useDocumentTitle';
import moment from 'moment';
import validator from 'validator';

const UserPage = () => {
  const user = useUser();

  useDocumentTitle(`Profil de ${user.username}`);

  return (
    <>
      <h2 className="text-4xl text-center mb-10 font-bold">Profil de {user.username}</h2>
      <User
        username={user.username ? validator.unescape(user.username) : ''}
        avatar={user.avatar}
        key={user.id_user}
        firstName={user.first_name ? validator.unescape(user.first_name) : ''}
        lastName={user.last_name ? validator.unescape(user.last_name) : ''}
        gender={user.gender}
        webUrl={user.web_url ? validator.unescape(user.web_url) : ''}
        email={user.email}
        dateRegistration={moment(user.date_registration).format('L')}
        biography={user.biography ? validator.unescape(user.biography) : ''}
        skills={user.skills ? validator.unescape(user.skills) : ''}
        role={user.role === 'administrator' ? 'Administrateur' : 'Utilisateur'}
      />
    </>
  );
};

export default UserPage;
