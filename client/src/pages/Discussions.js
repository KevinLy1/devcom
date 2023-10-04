import React, { useEffect, useState } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import DiscussionCard from '../components/Blog/DiscussionCard';
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';
import moment from 'moment';
import 'moment/locale/fr';
import { apiUserById } from '../api/users';
import {
  apiPublications,
  apiPublicationCategories,
  apiPublicationReputation,
  apiPublicationComments
} from '../api/publications';
import { Input } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { notification } from 'antd';

const DiscussionsPage = () => {
  useDocumentTitle('Liste des discussions');

  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState({});
  const [categories, setCategories] = useState({});
  const [reputations, setReputations] = useState({});
  const [comments, setComments] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');

  // Récupérer les articles
  useEffect(() => {
    async function getPublications() {
      try {
        const response = await apiPublications();
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        } else {
          notification.error({ message: 'Erreur lors de la récupération des articles.' });
        }
      } catch (error) {
        // notification.error({
        //   message: 'Erreur lors de la récupération des articles',
        //   description: error
        // });
      }
    }

    getPublications();
  }, []);

  // Récupérer les informations des utilisateurs liés aux articles
  useEffect(() => {
    async function getArticlesData() {
      try {
        const usersData = {};
        for (const article of articles) {
          if (!usersData[article.id_user]) {
            const response = await apiUserById(article.id_user);
            const user = await response.json();
            usersData[article.id_user] = user;
          }
        }
        setUsers(usersData);

        const categoriesData = {}; // Crée un objet pour stocker les données de catégories par id_publication
        for (const article of articles) {
          if (!categoriesData[article.id_publication]) {
            const response = await apiPublicationCategories(article.id_publication);
            const categories = await response.json();
            setCategories((prevCategories) => ({
              ...prevCategories,
              [article.id_publication]: categories
            }));
          }
        }

        const reputationsData = {}; // Crée un objet pour stocker les données de catégories par id_publication
        for (const article of articles) {
          if (!reputationsData[article.id_publication]) {
            const response = await apiPublicationReputation(article.id_publication);
            const reputations = await response.json();
            setReputations((prevReputations) => ({
              ...prevReputations,
              [article.id_publication]: reputations
            }));
          }
        }

        const commentsData = {}; // Crée un objet pour stocker les données de catégories par id_publication
        for (const article of articles) {
          if (!commentsData[article.id_publication]) {
            const response = await apiPublicationComments(article.id_publication);
            const comments = await response.json();
            setComments((prevComments) => ({
              ...prevComments,
              [article.id_publication]: comments
            }));
          }
        }
      } catch (error) {
        // notification.error({
        //   message: 'Erreur lors de la récupération des informations des utilisateurs :',
        //   description: error
        // });
      }
    }

    getArticlesData();
  }, [articles]);

  // Trier les articles en fonction de l'option de tri sélectionnée
  let sortedArticles = articles
    .filter((item) => item.type === 'discussion')
    .filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())) // Filtrer par titre
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return b.date_creation.localeCompare(a.date_creation);
      } else if (sortBy === 'oldest') {
        return a.date_creation.localeCompare(b.date_creation);
      } else if (sortBy === 'latestUpdate') {
        return b.date_update.localeCompare(a.date_update);
      }
      return 0;
    });

  // Calculer le nombre total de pages
  const itemsPerPage = 9;
  const totalPages = Math.ceil(sortedArticles.length / itemsPerPage);

  // Générer la liste des numéros de page
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Calculer les index des articles à afficher pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentArticles = sortedArticles.slice(indexOfFirstItem, indexOfLastItem);

  // Fonction de pagination
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    setCurrentPage(1); // Réinitialiser la page courante lorsque le terme de recherche change
  }, [searchTerm]);

  if (currentArticles) {
    return (
      <>
        {/* Barre de tri */}
        <div className="flex justify-center p-4 flex-wrap gap-11">
          <div className="flex items-center">
            <div className="flex">
              <button
                onClick={() => setSortBy('newest')}
                className={`px-2 py-1 rounded-lg ${
                  sortBy === 'newest'
                    ? 'bg-black text-white dark:bg-blue-800'
                    : 'bg-gray-300 dark:bg-slate-600'
                }`}>
                Plus récent
              </button>
              <button
                onClick={() => setSortBy('oldest')}
                className={`px-2 py-1 ml-2 rounded-lg ${
                  sortBy === 'oldest'
                    ? 'bg-black text-white dark:bg-blue-800'
                    : 'bg-gray-300 dark:bg-slate-600'
                }`}>
                Plus ancien
              </button>
              <button
                onClick={() => setSortBy('latestUpdate')}
                className={`px-2 py-1 ml-2 rounded-lg ${
                  sortBy === 'latestUpdate'
                    ? 'bg-black text-white dark:bg-blue-800'
                    : 'bg-gray-300 dark:bg-slate-600'
                }`}>
                Dernière mise à jour
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <Input
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Rechercher un article"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] !pr-9 border-blue-gray-200 focus:border-gray-900"
            />
          </div>
        </div>

        {/* Pagination en haut */}
        <div className="flex justify-center p-4">
          <div className="flex">
            <button
              onClick={() => paginate(1)}
              disabled={currentPage === 1}
              className="px-2 py-1 mr-2 bg-gray-300 dark:bg-slate-800 rounded-lg">
              <FaAngleDoubleLeft />
            </button>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 mr-2 bg-gray-300 dark:bg-slate-800 rounded-lg">
              <FaAngleLeft />
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-2 py-1 mx-1 rounded-lg ${
                  number === currentPage
                    ? 'bg-gray-500 dark:bg-slate-950'
                    : 'bg-gray-300 dark:bg-slate-800'
                }`}>
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 ml-2 bg-gray-300 dark:bg-slate-800 rounded-lg">
              <FaAngleRight />
            </button>
            <button
              onClick={() => paginate(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 ml-2 bg-gray-300 dark:bg-slate-800 rounded-lg">
              <FaAngleDoubleRight />
            </button>
          </div>
        </div>

        {/* Liste d'articles */}
        {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"> */}
        <div className="flex flex-col gap-1 justify-center">
          {currentArticles.map((article) => (
            <>
              <DiscussionCard
                key={article.id_publication}
                title={article.title}
                categories={categories[article.id_publication] || []}
                reputation={reputations[article.id_publication] || []}
                comments={comments[article.id_publication] || []}
                description={article.description}
                image={article.image}
                idUser={article.id_user}
                author={users[article.id_user]?.username}
                authorAvatar={users[article.id_user]?.avatar}
                idPublication={article.id_publication}
                isLiked={reputations[article.id_publication]?.reputation_value === 1 || false}
                isDisliked={reputations[article.id_publication]?.reputation_value !== 1 || false}
                // isFavourite={}
                dateCreation={moment(article.date_creation).format('LLLL')}
                dateUpdate={moment(article.date_update).format('LLLL')}
              />
              <hr />
            </>
          ))}
        </div>

        {/* Pagination en bas */}
        <div className="flex justify-center p-4">
          <div className="flex">
            <button
              onClick={() => paginate(1)}
              disabled={currentPage === 1}
              className="px-2 py-1 mr-2 bg-gray-300 dark:bg-slate-800 rounded-lg">
              <FaAngleDoubleLeft />
            </button>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 mr-2 bg-gray-300 dark:bg-slate-800 rounded-lg">
              <FaAngleLeft />
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-2 py-1 mx-1 rounded-lg ${
                  number === currentPage
                    ? 'bg-gray-500 dark:bg-slate-950'
                    : 'bg-gray-300 dark:bg-slate-800'
                }`}>
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 ml-2 bg-gray-300 dark:bg-slate-800 rounded-lg">
              <FaAngleRight />
            </button>
            <button
              onClick={() => paginate(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 ml-2 bg-gray-300 dark:bg-slate-800 rounded-lg">
              <FaAngleDoubleRight />
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return <div>Aucun article</div>;
  }
};

export default DiscussionsPage;
