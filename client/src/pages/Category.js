import React from 'react';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import { Square3Stack3DIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useCategory, useArticles } from '../hooks/useCategory';
import { ArticleCard } from '../components/Blog/ArticleCard';
import moment from 'moment';
import 'moment/locale/fr';

const CategoryPage = () => {
  const category = useCategory();
  const { articles, users, categories, reputations, comments } = useArticles();
  console.log(articles);

  const data = [
    {
      label: 'Articles',
      value: 'dashboard',
      icon: Square3Stack3DIcon,
      desc: (
        <div className="flex flex-col gap-10 justify-center">
          {articles.map((article) => (
            <ArticleCard
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
          ))}
        </div>
      )
    },
    {
      label: 'Discussions',
      value: 'profile',
      icon: UserCircleIcon,
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`
    }
  ];

  return (
    <>
      <h1 className="text-2xl text-center mb-10">Parcourir la catégorie : {category.title}</h1>
      <Tabs value="dashboard">
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
