import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching user:', error));
  }, [id]);

  return (
    <div>
      {user ? (
        <div>
          <h2>{user.username}</h2>
          <p>Email: {user.email}</p>
          <p>Gender: {user.gender}</p>
          {/* Affichez d'autres informations de l'utilisateur ici */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
