import useUser from '../hooks/useUser';
import ProfileCard from '../components/Profile/ProfileCard';
import ProfileDetails from '../components/Profile/ProfileDetails';
import moment from 'moment';
import 'moment/locale/fr';
import useDocumentTitle from '../hooks/useDocumentTitle';

const UserPage = () => {
  const user = useUser();

  useDocumentTitle(`${user.username}`);

  return (
    <div className="flex justify-around gap-3 sm:flex-wrap md:flex-nowrap">
      <ProfileCard key={user.id_user} username={user.username} avatar={user.avatar} />
      <ProfileDetails
        key={user.id_user}
        firstName={user.first_name}
        lastName={user.last_name}
        gender={user.gender}
        webUrl={user.web_url}
        email={user.email}
        dateRegistration={moment(user.date_registration).format('LLLL')}
        biography={user.biography}
        role={user.role === 'administrator' ? 'Administrateur' : 'Utilisateur'}
      />
    </div>
  );
};

export default UserPage;
