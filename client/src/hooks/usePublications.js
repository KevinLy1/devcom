import { useEffect, useState } from 'react';
import { apiUserById } from '../api/users';
import { apiPublications } from '../api/publications';
import {
  apiPublicationCategories,
  apiPublicationReputation,
  apiPublicationComments
} from '../api/publications';

const usePublications = () => {
  const [publications, setPublications] = useState([]);
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await apiPublications();
        if (response.ok) {
          const publicationsData = await response.json();
          setPublications(publicationsData);
        } else {
          const json = await response.json();
          console.error(json.message);
        }
      } catch (error) {
        //
      }
    };

    fetchPublications();
  }, []);

  return publications;
};

export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reputations, setReputations] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await apiPublications();
        if (response.ok) {
          const publicationsData = await response.json();
          const articles = publicationsData.filter((publication) => publication.type === 'article');
          setArticles(articles);
        } else {
          const json = await response.json();
          console.error(json.message);
        }
      } catch (error) {
        //
      }
    };

    fetchArticles();
  }, []);

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
      } catch (error) {
        //
      }
    };

    fetchArticlesData();
  }, [articles]);

  return { articles, users, categories, reputations, comments };
};

export const useDiscussions = () => {
  const [discussions, setDiscussions] = useState([]);
  const [users, setUsers] = useState({});
  const [categories, setCategories] = useState({});
  const [reputations, setReputations] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await apiPublications();
        if (response.ok) {
          const publicationsData = await response.json();
          const discussions = publicationsData.filter(
            (publication) => publication.type === 'discussion'
          );
          setDiscussions(discussions);
        } else {
          const json = await response.json();
          console.error(json.message);
        }
      } catch (error) {
        //
      }
    };

    fetchDiscussions();
  }, []);

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
      } catch (error) {
        //
      }
    };

    fetchDiscussionsData();
  }, [discussions]);

  return { discussions, users, categories, reputations, comments };
};

export default usePublications;
