import { useEffect, useState } from 'react';
import { apiFavoritePublications } from '../api/users';
import useAuth from '../contexts/AuthContext';

const useFavorites = () => {
  const { userData } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await apiFavoritePublications(userData.id_user);
        if (response.ok) {
          const favoritesData = await response.json();
          setFavorites(favoritesData);
        } else {
          const json = await response.json();
          console.error(json.message);
        }
      } catch (error) {
        //
      }
    };

    fetchFavorites();
  }, [userData]);

  return favorites;
};

export default useFavorites;
