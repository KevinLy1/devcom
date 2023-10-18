import { useEffect, useState } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import ArticleCard from '../components/Blog/ArticleCard';
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';
import { Input } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useArticles } from '../hooks/usePublications';
import useFavorites from '../hooks/useFavorites';
import moment from 'moment';
import 'moment/locale/fr';

const ArticlesPage = () => {
  useDocumentTitle('Liste des articles');

  const { articles, users, categories, reputations, comments } = useArticles();

  const favorites = useFavorites();

  // État pour stocker la page actuelle
  const [currentPage, setCurrentPage] = useState(1);

  // État pour stocker l'option de tri
  const [sortBy, setSortBy] = useState('newest');

  const [searchTerm, setSearchTerm] = useState('');

  // Trier les articles en fonction de l'option de tri sélectionnée
  let sortedArticles = articles
    .filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())) // Filtrer par titre
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return b.date_creation.localeCompare(a.date_creation);
      } else if (sortBy === 'oldest') {
        return a.date_creation.localeCompare(b.date_creation);
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
                  sortBy === 'newest' ? 'bg-black text-white dark:bg-blue-800' : 'bg-gray-300 dark:bg-slate-600'
                }`}>
                Plus récent
              </button>
              <button
                onClick={() => setSortBy('oldest')}
                className={`px-2 py-1 ml-2 rounded-lg ${
                  sortBy === 'oldest' ? 'bg-black text-white dark:bg-blue-800' : 'bg-gray-300 dark:bg-slate-600'
                }`}>
                Plus ancien
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <Input
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Rechercher un article"
              value={searchTerm}
              color={localStorage.theme === 'dark' ? 'white' : 'black'}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                  number === currentPage ? 'bg-gray-500 dark:bg-slate-950' : 'bg-gray-300 dark:bg-slate-800'
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
        <div className="flex justify-center md:justify-around">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
            {currentArticles.map((article) => (
              <ArticleCard
                key={article.id_publication}
                title={article.title}
                categories={categories[article.id_publication] || []}
                reputation={reputations[article.id_publication] || []}
                isFavorite={favorites.some((favorite) => favorite.id_publication === article.id_publication)}
                comments={comments[article.id_publication] || []}
                description={article.description}
                image={article.image}
                idUser={article.id_user}
                author={users[article.id_user]?.username || 'Utilisateur supprimé'}
                authorAvatar={users[article.id_user]?.avatar}
                idPublication={article.id_publication}
                dateCreation={moment(article.date_creation).format('LLL')}
                dateUpdate={article.date_update ? moment(article.date_update).format('LLL') : null}
              />
            ))}
          </div>
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
                  number === currentPage ? 'bg-gray-500 dark:bg-slate-950' : 'bg-gray-300 dark:bg-slate-800'
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

export default ArticlesPage;
