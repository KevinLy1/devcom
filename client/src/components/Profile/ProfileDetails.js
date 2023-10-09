const ProfileDetails = (props) => {
  return (
    <div className="p-3 shadow-sm rounded-sm">
      <div className="flex items-center space-x-2 font-semibold leading-8">
        <span className="text-green-500">
          <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </span>
        <span className="tracking-wide">À propos</span>
      </div>
      <div className="text-gray-700">
        <div className="grid md:grid-cols-2 text-sm">
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Prénom</div>
            <div className="px-4 py-2">{props.firstName}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Nom</div>
            <div className="px-4 py-2">{props.lastName}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Civilité</div>
            <div className="px-4 py-2">{props.gender}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Site internet</div>
            <div className="px-4 py-2">
              <a className="text-blue-800" href={props.webUrl}>
                {props.webUrl}
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Email</div>
            <div className="px-4 py-2">
              <a className="text-blue-800" href={`mailto:${props.email}`}>
                {props.email}
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Inscrit depuis le :</div>
            <div className="px-4 py-2">{props.dateRegistration}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Statut :</div>
            <div className="px-4 py-2">{props.role}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 font-semibold leading-8">
        <span className="text-green-500">
          <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </span>
        <span className="tracking-wide">Biographie</span>
      </div>
      <div className="flex">
        <p>{props.biography}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
