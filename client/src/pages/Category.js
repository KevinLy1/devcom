import React from 'react';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import { Square3Stack3DIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useCategory, useArticles, useDiscussions } from '../hooks/useCategory';
import ArticleCard from '../components/Blog/ArticleCard';
import DiscussionCard from '../components/Blog/DiscussionCard';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useFavorites from '../hooks/useFavorites';
import moment from 'moment';
import 'moment/locale/fr';

const CategoryPage = () => {
  const category = useCategory();

  const favorites = useFavorites();

  const {
    articles,
    users: usersArticles,
    categories: categoriesArticles,
    reputations: reputationsArticles,
    comments: commentsArticles
  } = useArticles();
  const {
    discussions,
    users: usersDiscussions,
    categories: categoriesDiscussions,
    reputations: reputationsDiscussions,
    comments: commentsDiscussions
  } = useDiscussions();

  useDocumentTitle(`Catégorie ${category.title}`);

  const data = [
    {
      label: 'Articles',
      value: 'articles',
      icon: Square3Stack3DIcon,
      desc: (
        <div className="flex justify-center md:justify-around">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {articles.length > 0 ? (
              articles
                .slice()
                .reverse()
                .map((article) => (
                  <ArticleCard
                    key={article.id_publication}
                    title={article.title}
                    categories={categoriesArticles[article.id_publication] || []}
                    reputation={reputationsArticles[article.id_publication] || []}
                    isFavorite={favorites.some((favorite) => favorite.id_publication === article.id_publication)}
                    comments={commentsArticles[article.id_publication] || []}
                    description={article.description}
                    image={article.image}
                    idUser={article.id_user}
                    author={usersArticles[article.id_user]?.username}
                    authorAvatar={usersArticles[article.id_user]?.avatar}
                    idPublication={article.id_publication}
                    dateCreation={moment(article.date_creation).format('LLL')}
                    dateUpdate={article.date_update ? moment(article.date_update).format('LLL') : null}
                  />
                ))
            ) : (
              <p>Pas d'articles disponibles pour cette catégorie.</p>
            )}
          </div>
        </div>
      )
    },
    {
      label: 'Discussions',
      value: 'discussions',
      icon: UserCircleIcon,
      desc: (
        <div className="flex flex-col gap-10 justify-center dark:text-white">
          {discussions.length > 0 ? (
            discussions
              .slice()
              .reverse()
              .map((discussion) => (
                <DiscussionCard
                  key={discussion.id_publication}
                  title={discussion.title}
                  categories={categoriesDiscussions[discussion.id_publication] || []}
                  reputation={reputationsDiscussions[discussion.id_publication] || []}
                  isFavorite={favorites.some((favorite) => favorite.id_publication === discussion.id_publication)}
                  comments={commentsDiscussions[discussion.id_publication] || []}
                  description={discussion.description}
                  image={discussion.image}
                  idUser={discussion.id_user}
                  author={usersDiscussions[discussion.id_user]?.username}
                  authorAvatar={usersDiscussions[discussion.id_user]?.avatar}
                  idPublication={discussion.id_publication}
                  isLiked={reputationsDiscussions[discussion.id_publication]?.reputation_value === 1 || false}
                  isDisliked={reputationsDiscussions[discussion.id_publication]?.reputation_value !== 1 || false}
                  dateCreation={moment(discussion.date_creation).format('LLL')}
                  dateUpdate={discussion.date_update ? moment(discussion.date_update).format('LLL') : null}
                />
              ))
          ) : (
            <p>Pas de discussions disponibles pour cette catégorie.</p>
          )}
        </div>
      )
    }
  ];

  return (
    <>
      <h1 className="text-2xl text-center mb-10">Parcourir la catégorie : {category.title}</h1>
      <Tabs value="articles">
        <TabsHeader>
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div className="flex items-center gap-2">
                {React.createElement(icon, { className: 'w-5 h-5' })}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </>
  );
};

export default CategoryPage;
