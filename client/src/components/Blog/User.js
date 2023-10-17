import { Link } from 'react-router-dom';
import { FaFile, FaUser } from 'react-icons/fa';

const Profile = (props) => {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
      <div className="md:col-span-1">
        <img
          src={props.avatar ? props.avatar : '/assets/img/default-avatar.svg'}
          alt={props.username}
          className="rounded-full w-full h-auto"
        />
      </div>

      <div className="md:col-span-2">
        <div className="flex items-center gap-2 font-semibold text-2xl px-4 py-2">
          <FaUser /> À propos
        </div>
        <div className="text-gray-700 dark:text-white">
          <div className="grid md:grid-cols-2 text-sm">
            {props.firstName && (
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Prénom</div>
                <div className="px-4 py-2">{props.firstName}</div>
              </div>
            )}
            {props.lastName && (
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Nom</div>
                <div className="px-4 py-2">{props.lastName}</div>
              </div>
            )}
            {props.gender && (
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Civilité</div>
                <div className="px-4 py-2">{props.gender}</div>
              </div>
            )}
            {props.webUrl && (
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Site internet</div>
                <div className="px-4 py-2">
                  <Link to={props.webUrl}>{props.webUrl}</Link>
                </div>
              </div>
            )}
            {props.email && (
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Email</div>
                <div className="px-4 py-2">
                  <Link to={`mailto:${props.email}`}>{props.email}</Link>
                </div>
              </div>
            )}
            {props.dateRegistration && (
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Date d'inscription</div>
                <div className="px-4 py-2">{props.dateRegistration}</div>
              </div>
            )}
            {props.role && (
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Statut</div>
                <div className="px-4 py-2">{props.role}</div>
              </div>
            )}
          </div>
        </div>

        {props.biography && (
          <>
            <div className="flex items-center gap-2 font-semibold text-2xl px-4 py-2 mt-10">
              <FaFile /> Biographie
            </div>
            <div className="px-4 py-2">{props.biography}</div>
          </>
        )}

        {props.skills && (
          <>
            <div className="flex items-center gap-2 font-semibold text-2xl px-4 py-2 mt-10">
              <FaFile /> Compétences
            </div>
            <div className="px-4 py-2">{props.skills}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
