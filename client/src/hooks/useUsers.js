import { useEffect, useState } from 'react';
import { apiUsers } from '../api/users';

const useUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiUsers();
        if (response.ok) {
          const usersData = await response.json();
          setUsers(usersData);
        } else {
          const json = await response.json();
          console.error(json.message);
        }
      } catch {
        console.error('Erreur interne');
      }
    };

    fetchUsers();
  }, []);

  return users;
};

export default useUsers;
