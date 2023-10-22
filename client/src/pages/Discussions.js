import { useEffect, useState } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import DiscussionCard from '../components/Blog/DiscussionCard';
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';
import { Input } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDiscussions } from '../hooks/usePublications';
import useFavorites from '../hooks/useFavorites';
import moment from 'moment';
import validator from 'validator';

const DiscussionsPage = () => {
  useDocumentTitle('Liste des discussions');

  const { discussions, users, categories, reputations, comments } = useDiscussions();

  const favorites = useFavorites();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');

  let sortedDiscussions = discussions
    .filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return b.date_creation.localeCompare(a.date_creation);
      } else if (sortBy === 'oldest') {
        return a.date_creation.localeCompare(b.date_creation);
      }
      return 0;
    });

  const itemsPerPage = 9;
  const totalPages = Math.ceil(sortedDiscussions.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDiscussions = sortedDiscussions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (currentDiscussions) {
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
              label="Rechercher par titre"
              value={searchTerm}
              color={localStorage.theme === 'dark' ? 'white' : 'black'}
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
        <div className="flex flex-col gap-10 justify-center w-full">
          {currentDiscussions.map((discussion) => (
            <DiscussionCard
              key={discussion.id_publication}
              title={discussion.title ? validator.unescape(discussion.title) : ''}
              categories={categories[discussion.id_publication] || []}
              reputation={reputations[discussion.id_publication] || []}
              isFavorite={favorites.some((favorite) => favorite.id_publication === discussion.id_publication)}
              comments={comments[discussion.id_publication] || []}
              description={discussion.description ? validator.unescape(discussion.description) : ''}
              idUser={discussion.id_user}
              author={users[discussion.id_user]?.username || 'Utilisateur supprimé'}
              authorAvatar={users[discussion.id_user]?.avatar}
              idPublication={discussion.id_publication}
              isLiked={reputations[discussion.id_publication]?.reputation_value === 1 || false}
              isDisliked={reputations[discussion.id_publication]?.reputation_value !== 1 || false}
              dateCreation={moment(discussion.date_creation).format('LLLL')}
              dateUpdate={discussion.date_update ? moment(discussion.date_update).format('LLL') : null}
            />
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
    return <div>Aucune discussion</div>;
  }
};

export default DiscussionsPage;
