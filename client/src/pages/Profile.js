import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { userData } = useAuth();

  if (userData) {
    return (
      <div>
        <p>ID utilisateur : {userData.id_user}</p>
        <p>Nom d'utilisateur : {userData.username}</p>
        <p>Rôle : {userData.role}</p>
      </div>
    );
  } else {
    return <p>Non connecté</p>;
  }
};

export default ProfilePage;
