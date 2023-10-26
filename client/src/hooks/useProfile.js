import { useState, useEffect } from 'react';
import { apiUserById } from '../api/users';
import useAuth from '../contexts/AuthContext';

const useProfile = () => {
  const { userData } = useAuth();
  const id = userData.id_user;

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiUserById(id);
        const userData = await response.json();
        setUser(userData);
      } catch {
        console.error('Erreur interne');
      }
    };

    fetchUser();
  }, [id]);

  return user;
};

export default useProfile;
