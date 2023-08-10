import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div>
      <h1>Page d'administration</h1>
      <ul>
        <li>
          <Link to="/users/1">Profil utilisateur 1</Link>
        </li>
        <li>
          <Link to="/users/2">Profil utilisateur 2</Link>
        </li>
        {/* Ajoutez d'autres liens vers les profils d'utilisateurs ici */}
      </ul>
    </div>
  );
};

export default AdminPage;
