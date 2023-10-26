import { useState, useEffect } from 'react';
import { apiPublicationsByCategory } from '../api/categories';
import { apiUserById } from '../api/users';
import { apiCategoryById } from '../api/categories';
import { useParams } from 'react-router-dom';
import {
  apiPublicationById,
  apiPublicationCategories,
  apiPublicationReputation,
  apiPublicationComments
} from '../api/publications';

export const useCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({});

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await apiCategoryById(id);
        const categoryData = await response.json();
        setCategory(categoryData);
      } catch {
        console.error('Erreur interne');
      }
    };

    fetchCategory();
  }, [id]);

  return category;
};

export const useArticles = () => {
  const { id } = useParams();

  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState({});
  const [categories, setCategories] = useState({});
  const [reputations, setReputations] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let articlesData = [];
        const response = await apiPublicationsByCategory(id);
        if (response.ok) {
          const publications = await response.json();
          publications.forEach(async (publication) => {
            const response2 = await apiPublicationById(publication.id_publication);
            if (response2.ok) {
              const publicationData = await response2.json();
              if (publicationData.type === 'article') articlesData.push(publicationData);
              setArticles(articlesData);
            }
          });
        } else {
          const json = await response.json();
          console.error(json.message);
        }
      } catch {
        console.error('Erreur interne');
      }
    };

    fetchArticles();
  }, [id]);

  useEffect(() => {
    const fetchArticlesData = async () => {
      try {
        // Récupérer les informations des utilisateurs liés aux articles
        const usersData = {};
        const categoriesData = {};
        const reputationsData = {};
        const commentsData = {};

        for (const article of articles) {
          // Récupérer les utilisateurs
          if (!usersData[article.id_user]) {
            const responseUser = await apiUserById(article.id_user);
            const userData = await responseUser.json();
            usersData[article.id_user] = userData;
          }

          // Récupérer les catégories
          if (!categoriesData[article.id_publication]) {
            const responseCategories = await apiPublicationCategories(article.id_publication);
            const categories = await responseCategories.json();
            categoriesData[article.id_publication] = categories;
          }

          // Récupérer les réputations
          if (!reputationsData[article.id_publication]) {
            const responseReputations = await apiPublicationReputation(article.id_publication);
            const reputations = await responseReputations.json();
            reputationsData[article.id_publication] = reputations;
          }

          // Récupérer les commentaires
          if (!commentsData[article.id_publication]) {
            const responseComments = await apiPublicationComments(article.id_publication);
            const comments = await responseComments.json();
            commentsData[article.id_publication] = comments;
          }
        }
        setUsers(usersData);
        setCategories(categoriesData);
        setReputations(reputationsData);
        setComments(commentsData);
      } catch {
        console.error('Erreur interne');
      }
    };

    fetchArticlesData();
  }, [articles]);

  return { articles, users, categories, reputations, comments };
};

export const useDiscussions = () => {
  const { id } = useParams();

  const [discussions, setDiscussions] = useState([]);
  const [users, setUsers] = useState({});
  const [categories, setCategories] = useState({});
  const [reputations, setReputations] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        let discussionsData = [];
        const response = await apiPublicationsByCategory(id);
        if (response.ok) {
          const publications = await response.json();
          publications.forEach(async (publication) => {
            const response2 = await apiPublicationById(publication.id_publication);
            if (response2.ok) {
              const publicationData = await response2.json();
              if (publicationData.type === 'discussion') discussionsData.push(publicationData);
              setDiscussions(discussionsData);
            }
          });
        } else {
          const json = await response.json();
          console.error(json.message);
        }
      } catch {
        console.error('Erreur interne');
      }
    };

    fetchDiscussions();
  }, [id]);

  useEffect(() => {
    const fetchDiscussionsData = async () => {
      try {
        // Récupérer les informations des utilisateurs liés aux articles
        const usersData = {};
        const categoriesData = {};
        const reputationsData = {};
        const commentsData = {};

        for (const discussion of discussions) {
          // Récupérer les utilisateurs
          if (!usersData[discussion.id_user]) {
            const responseUser = await apiUserById(discussion.id_user);
            const userData = await responseUser.json();
            usersData[discussion.id_user] = userData;
          }

          // Récupérer les catégories
          if (!categoriesData[discussion.id_publication]) {
            const responseCategories = await apiPublicationCategories(discussion.id_publication);
            const categories = await responseCategories.json();
            categoriesData[discussion.id_publication] = categories;
          }

          // Récupérer les réputations
          if (!reputationsData[discussion.id_publication]) {
            const responseReputations = await apiPublicationReputation(discussion.id_publication);
            const reputations = await responseReputations.json();
            reputationsData[discussion.id_publication] = reputations;
          }

          // Récupérer les commentaires
          if (!commentsData[discussion.id_publication]) {
            const responseComments = await apiPublicationComments(discussion.id_publication);
            const comments = await responseComments.json();
            commentsData[discussion.id_publication] = comments;
          }
        }
        setUsers(usersData);
        setCategories(categoriesData);
        setReputations(reputationsData);
        setComments(commentsData);
      } catch {
        console.error('Erreur interne');
      }
    };

    fetchDiscussionsData();
  }, [discussions]);

  return { discussions, users, categories, reputations, comments };
};
