import { useState, useEffect } from 'react';
import useFavorites from '../../hooks/useFavorites';
import { Link } from 'react-router-dom';
import { apiPublicationById } from '../../api/publications';

const MyFavoritesPage = () => {
  const favorites = useFavorites();
  const [favoritesData, setFavoritesData] = useState([]);

  useEffect(() => {
    const fetchFavoritesData = async () => {
      const fetchData = async () => {
        const data = [];
        for (const favorite of favorites) {
          const response = await apiPublicationById(favorite.id_publication);
          const publicationData = await response.json();
          data.push(publicationData);
        }
        setFavoritesData(data);
      };

      fetchData();
    };

    fetchFavoritesData();
  }, [favorites]);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-center text-3xl mb-5 font-bold">Mes publications favorites</h2>
      <div className="min-w-full overflow-hidden border border-gray-300 dark:border-gray-700 rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 dark:border-slate-950 bg-gray-100 dark:bg-slate-950 text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                Publication
              </th>
              <th className="px-5 py-3 border-b-2 dark:border-slate-950 bg-gray-100 dark:bg-slate-950 text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            {favoritesData.map((favorite, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-gray-50 dark:bg-slate-900' : 'bg-white dark:bg-slate-950'}>
                <td className="px-5 py-5 border-b border-gray-200 dark:border-slate-700 text-sm">
                  <Link className="whitespace-no-wrap" to={`/${favorite.type}/${favorite.id_publication}`}>
                    {favorite.title}
                  </Link>
                  <br />
                  <span className="italic">{favorite.description}</span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 dark:border-slate-700 text-sm">
                  <p className="text-gray-900 dark:text-gray-100 whitespace-no-wrap">{favorite.type}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFavoritesPage;
