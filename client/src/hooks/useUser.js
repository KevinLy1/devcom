import { useState, useEffect } from 'react';
import { apiUserById } from '../api/users';
import { useParams } from 'react-router-dom';

const useUser = () => {
  const { id } = useParams();
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

export default useUser;
