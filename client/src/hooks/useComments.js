import { useState, useEffect } from 'react';
import { apiComments } from '../api/comments';

const useComments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiComments();
        const commentsData = await response.json();
        setComments(commentsData);
      } catch {
        console.error('Erreur interne');
      }
    };

    fetchCategories();
  }, []);

  return comments;
};

export default useComments;
