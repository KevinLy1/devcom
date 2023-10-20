import BlogCard from '../components/Blog/BlogCard';
import StatisticsCard from '../components/Blog/StatisticsCard';
import CategoryCard from '../components/Blog/CategoryCard';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useCategories from '../hooks/useCategories';
import { useLatestArticles, useLatestDiscussions } from '../hooks/useLatestPublications';
import useUsers from '../hooks/useUsers';
import usePublications from '../hooks/usePublications';
import useFavorites from '../hooks/useFavorites';
import moment from 'moment';
import 'moment/locale/fr';

const HomePage = () => {
  useDocumentTitle('Accueil');

  const users = useUsers();
  const categories = useCategories();
  const publications = usePublications();

  const {
    articles,
    users: articleUsers,
    reputations: articleReputations,
    comments: articleComments
  } = useLatestArticles();
  const {
    discussions,
    users: discussionUsers,
    reputations: discussionReputations,
    comments: discussionComments
  } = useLatestDiscussions();
  const favorites = useFavorites();

  return (
    <>
      <section className="flex flex-col items-center">
        <h1 className="text-4xl font-semibold sm:text-6xl">
          <span className="text-blue-900 dark:text-white">Bienvenue sur</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
            DEV.COMmunity
          </span>
        </h1>
        <h2 className="mt-4 sm:mt-10 text-lg leading-8 mx-auto max-w-5xl">
          Restez curieux. Découvrez des articles, des astuces, des questions de la communauté et l'expertise de
          développeurs chevronnés sur n'importe quel sujet.
        </h2>
      </section>

      {(users.length > 0 || publications.length > 0 || categories.length > 0) && (
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-y-12 sm:mt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3 sm:auto-rows-fr">
          {users.length > 0 && (
            <StatisticsCard number={users.length} title="Contributeurs" description="Rejoignez notre communauté !" />
          )}

          {publications.length > 0 && (
            <StatisticsCard number={publications.length} title="Contributions" description="Participez également !" />
          )}

          {categories.length > 0 && (
            <StatisticsCard number={categories.length} title="Catégories" description="sur divers sujets" />
          )}
        </div>
      )}

      {categories.length > 0 && (
        <section className="mx-auto hidden lg:grid lg:gap-6 lg:grid-cols-4 lg:max-w-none auto-rows-fr mt-12">
          {categories.map((category) => (
            <CategoryCard
              key={category.id_category}
              title={category.title}
              link={`/category/${category.id_category}`}
              className="text-black dark:text-white"
            />
          ))}
        </section>
      )}

      <section className="py-12 lg:py-16 relative">
        <h2 className="text-4xl leading-10 lg:text-5xl font-semibold tracking-tighter text-eclipse lg:leading-12 mb-5">
          Les 6 derniers articles
        </h2>
        <div className="flex justify-center md:justify-around">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <BlogCard
                  key={article.id_publication}
                  type="article"
                  idPublication={article.id_publication}
                  title={article.title}
                  reputation={articleReputations[article.id_publication] || []}
                  isFavorite={favorites.some((favorite) => favorite.id_publication === article.id_publication)}
                  comments={articleComments[article.id_publication] || []}
                  image={article.image}
                  description={article.description}
                  idUser={article.id_user}
                  author={articleUsers[article.id_user]?.username || 'Utilisateur supprimé'}
                  authorAvatar={articleUsers[article.id_user]?.avatar}
                  dateCreation={moment(article.date_creation).format('L')}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10">Aucun article pour le moment</div>
          )}
        </div>
      </section>

      <section className="py-12 lg:py-16 relative">
        <h2 className="text-4xl leading-10 lg:text-5xl font-semibold tracking-tighter text-eclipse lg:leading-12 mb-5">
          Les 6 dernières discussions
        </h2>
        <div className="flex justify-center md:justify-around">
          {discussions.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {discussions.map((discussion) => (
                <BlogCard
                  key={discussion.id_publication}
                  type="discussion"
                  idPublication={discussion.id_publication}
                  title={discussion.title}
                  reputation={discussionReputations[discussion.id_publication] || []}
                  isFavorite={favorites.some((favorite) => favorite.id_publication === discussion.id_publication)}
                  comments={discussionComments[discussion.id_publication] || []}
                  image={discussion.image}
                  description={discussion.description}
                  idUser={discussion.id_user}
                  author={discussionUsers[discussion.id_user]?.username || 'Utilisateur supprimé'}
                  authorAvatar={discussionUsers[discussion.id_user]?.avatar}
                  dateCreation={moment(discussion.date_creation).format('L')}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10">Aucune discussion pour le moment</div>
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;
