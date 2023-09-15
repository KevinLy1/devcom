import { useState, useEffect } from 'react';
import { apiUserById } from '../api/users';
import {
  apiLatestArticles,
  apiLatestDiscussions,
  apiPublicationCategories,
  apiPublicationReputation,
  apiPublicationComments
} from '../api/publications';

export const useLatestArticles = () => {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState({});
  const [categories, setCategories] = useState({});
  const [reputations, setReputations] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const response = await apiLatestArticles();
        if (response.ok) {
          const latestArticlesData = await response.json();
          setArticles(latestArticlesData);
        } else {
          const json = await response.json();
          console.error(json.message);
        }
      } catch (error) {
        //
      }
    };

    fetchLatestArticles();
  }, []);

  useEffect(() => {
    const fetchLatestArticlesData = async () => {
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

    fetchLatestArticlesData();
  }, [articles]);

  return { articles, users, categories, reputations, comments };
};

export const useLatestDiscussions = () => {
  const [discussions, setDiscussions] = useState([]);
  const [users, setUsers] = useState({});
  const [categories, setCategories] = useState({});
  const [reputations, setReputations] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchLatestDiscussions = async () => {
      try {
        const response = await apiLatestDiscussions();
        if (response.ok) {
          const latestDiscussionsData = await response.json();
          setDiscussions(latestDiscussionsData);
        } else {
          const json = await response.json();
          console.error(json.message);
        }
      } catch (error) {
        //
      }
    };

    fetchLatestDiscussions();
  }, []);

  useEffect(() => {
    const fetchLatestDiscussions = async () => {
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

    fetchLatestDiscussions();
  }, [discussions]);

  return { discussions, users, categories, reputations, comments };
};
