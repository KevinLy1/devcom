import { useState, useEffect } from 'react';
import { apiCategories } from '../api/categories';

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiCategories();
        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    };

    fetchCategories();
  }, []);

  return categories;
};

export default useCategories;
