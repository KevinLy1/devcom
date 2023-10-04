// import { Link } from 'react-router-dom';
// import { Breadcrumbs } from '@material-tailwind/react';
import ProfileCard from '../../components/Profile/ProfileCard';
import ProfileDetails from '../../components/Profile/ProfileDetails';
import { useAuth } from '../../contexts/AuthContext';
import useDocumentTitle from '../../hooks/useDocumentTitle';

import moment from 'moment';

const ProfilePage = () => {
  const { userData } = useAuth();

  useDocumentTitle('Votre profil');

  if (userData) {
    return (
      <>
        {/* <Breadcrumbs separator=">" className="bg-gray-500 dark:bg-slate-900">
          <Link to="/" className="opacity-60 dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </Link>
          <Link to="/dashboard" className="opacity-60 dark:text-white">
            Tableau de bord
          </Link>
          <span className="dark:text-white">Profil</span>
        </Breadcrumbs> */}

        <div className="flex justify-around gap-3 sm:flex-wrap md:flex-nowrap">
          <ProfileCard
            key={userData.id_user}
            username={userData.username}
            avatar={userData.avatar}
          />
          <ProfileDetails
            key={userData.id_user}
            firstName={userData.first_name}
            lastName={userData.last_name}
            gender={userData.gender}
            webUrl={userData.web_url}
            email={userData.email}
            dateRegistration={moment(userData.date_registration).format('LLLL')}
            biography={userData.biography}
            role={userData.role === 'administrator' ? 'Administrateur' : 'Utilisateur'}
          />
        </div>
      </>
    );
  } else {
    return <p>Non connecté</p>;
  }
};

export default ProfilePage;
