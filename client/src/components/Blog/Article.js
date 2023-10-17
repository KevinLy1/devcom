import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  handleLike,
  handleDislike,
  handleCancelLike,
  handleCancelDislike,
  handleFavorite,
  handleCancelFavorite
} from '../../actions/publicationActions';
import { FaThumbsUp, FaThumbsDown, FaStar, FaTag } from 'react-icons/fa';
import useAuth from '../../contexts/AuthContext';

const Article = (props) => {
  const { userData } = useAuth();

  const [articleLocalState, setArticleLocalState] = useState({
    isLiked: false,
    isDisliked: false,
    isFavorite: false,
    reputation: 0
  });

  useEffect(() => {
    let totalReputation = 0;
    let isLiked = false;
    let isDisliked = false;
    let isFavorite = false;

    if (props.reputation.length > 0) {
      for (let i = 0; i < props.reputation.length; i++) {
        totalReputation += props.reputation[i].reputation_value;
      }
      if (userData) {
        isLiked = props.reputation.some(
          (reputation) => reputation.id_user === userData.id_user && reputation.reputation_value === 1
        );
        isDisliked = props.reputation.some(
          (reputation) => reputation.id_user === userData.id_user && reputation.reputation_value === -1
        );
        isFavorite = props.isFavorite;
      }
    }
    setArticleLocalState((prevState) => ({
      ...prevState,
      isLiked: isLiked,
      isDisliked: isDisliked,
      isFavorite: isFavorite,
      reputation: totalReputation
    }));
  }, [props.reputation, props.isFavorite, userData]);

  const categories =
    props.categories.length > 0
      ? props.categories.map((category) => ({
          id_category: category.id_category,
          title: category.title
        }))
      : [];

  return (
    <>
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-3xl font-extrabold leading-tight lg:text-4xl">{props.title}</h1>
        {/* PETITS ÉCRANS */}
        <aside className="flex flex-wrap gap-2 mt-5 xl:hidden">
          {categories.map((category) => (
            <a key={category.id_category} href={`/category/${category.id_category}`}>
              <div className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-800 dark:bg-slate-800 rounded cursor-pointer hover:bg-gray-500 dark:hover:bg-blue-900 flex items-center gap-2">
                <FaTag /> {category.title}
              </div>
            </a>
          ))}
        </aside>
        <p className="italic">{props.description}</p>
        <address className="flex items-center mb-6 not-italic">
          <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            <img
              className="mr-4 w-16 h-16 rounded-full"
              src={props.authorAvatar ? props.authorAvatar : '/assets/img/default-avatar.svg'}
              alt={props.author}
            />
            <div>
              <Link to={`/user/${props.idUser}`} rel="author" className="text-xl font-bold">
                {props.author}
              </Link>
              <p className="text-base font-light text-gray-700 dark:text-gray-400">
                Publié le : <time>{props.dateCreation}</time>
                {props.dateUpdate !== null && (
                  <>
                    <br />
                    Dernière mise à jour : <time>{props.dateUpdate}</time>
                  </>
                )}
              </p>
            </div>
          </div>
        </address>
      </div>
      <div className="xl:flex xl:gap-5">
        <div className="xl:flex-1 xl:flex xl:justify-between mx-auto max-w-screen-xl">
          <article className="mx-auto w-full px-5 py-10 bg-white dark:bg-slate-950 rounded-xl text-justify">
            {props.image && (
              <div className="w-full h-52 max-h-52 mb-10">
                <img src={props.image} alt={props.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div>{props.content}</div>
            <div className="xl:hidden">
              <div className="flex flex-col mt-10 bg-linen rounded-lg p-4 space-y-4">
                <button
                  type="button"
                  className={`flex gap-2 items-center rounded-lg justify-center bg-transparent ring-1 ring-inset hover:bg-gray-50/80 bg-white dark:bg-slate-950 p-4 shadow-sm font-medium py-3.5 px-2 text-base opacity-100`}
                  onClick={
                    articleLocalState.isFavorite
                      ? () => handleCancelFavorite(userData, props, setArticleLocalState)
                      : () => handleFavorite(userData, props, setArticleLocalState)
                  }>
                  <FaStar className={articleLocalState.isFavorite ? 'text-yellow-500' : ''} />{' '}
                  {!articleLocalState.isFavorite ? "Ajouter l'article aux favoris" : "Retirer l'article des favoris"}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-16 justify-center dark:text-white text-4xl xl:hidden">
              <FaThumbsUp
                className={`cursor-pointer ${articleLocalState.isLiked ? 'text-green-500' : ''}`}
                onClick={
                  articleLocalState.isLiked
                    ? () => handleCancelLike(userData, props, setArticleLocalState)
                    : () => handleLike(userData, props, articleLocalState, setArticleLocalState)
                }
              />
              {articleLocalState.reputation}
              <FaThumbsDown
                className={`cursor-pointer ${articleLocalState.isDisliked ? 'text-red-500' : ''}`}
                onClick={
                  articleLocalState.isDisliked
                    ? () => handleCancelDislike(userData, props, setArticleLocalState)
                    : () => handleDislike(userData, props, articleLocalState, setArticleLocalState)
                }
              />
            </div>
          </article>
        </div>
        <div className="hidden xl:sticky xl:top-28 xl:block mb-8 w-full xl:w-96 shrink-0 xl:mb-0 space-y-6">
          <aside className="flex flex-col before:rounded-xl before:block before:absolute before:-inset-[5px] before:top-[5px] before:left-2 relative sm:max-w-none h-full w-full xl:w-auto">
            <div className="block w-full xl:w-96 shrink-0 xl:mb-0 xl:block border dark:border-slate-900 bg-white dark:bg-slate-950 rounded-lg p-6 sm:p-8 py-10 z-20">
              <div className="hidden xl:flex items-center space-x-4 mb-4 xl:mb-0">
                <h2 className="inline sm:block lg:inline xl:block font-semibold tracking-tight text-xl">
                  {props.title}
                </h2>
              </div>
              <div className="xl:my-8 mb-6 xl:mb-0">
                <p className="font-normal text-base leading-7">{props.description}</p>
                <hr className="h-px w-full my-8 flex-shrink-0 border-0 bg-cloud/50" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xl:grid-cols-1">
                <div className="my-2">
                  <div className="flex flex-col space-y-4">
                    <p className="text-sm font-semibold text-eclipse/60 uppercase tracking-wide">
                      {categories.length > 0 && <span>Catégorie{categories.length > 1 ? 's' : ''}</span>}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <a key={category.id_category} href={`/category/${category.id_category}`}>
                          <div className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-800 dark:bg-slate-800 rounded cursor-pointer hover:bg-gray-500 dark:hover:bg-blue-900 flex items-center gap-2">
                            <FaTag /> {category.title}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col bg-linen rounded-lg p-4 space-y-4">
                    <button
                      type="button"
                      className={`flex gap-2 items-center rounded-lg justify-center bg-transparent ring-1 ring-inset hover:bg-gray-50/80 bg-white dark:bg-slate-950 p-4 shadow-sm font-medium py-3.5 px-2 text-base opacity-100`}
                      onClick={
                        articleLocalState.isFavorite
                          ? () => handleCancelFavorite(userData, props, setArticleLocalState)
                          : () => handleFavorite(userData, props, setArticleLocalState)
                      }>
                      <FaStar className={articleLocalState.isFavorite ? 'text-yellow-500' : ''} />{' '}
                      {!articleLocalState.isFavorite
                        ? "Ajouter l'article aux favoris"
                        : "Retirer l'article des favoris"}
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-16 justify-center dark:text-white text-4xl">
                  <FaThumbsUp
                    className={`cursor-pointer ${articleLocalState.isLiked ? 'text-green-500' : ''}`}
                    onClick={
                      articleLocalState.isLiked
                        ? () => handleCancelLike(userData, props, setArticleLocalState)
                        : () => handleLike(userData, props, articleLocalState, setArticleLocalState)
                    }
                  />
                  {articleLocalState.reputation}
                  <FaThumbsDown
                    className={`cursor-pointer ${articleLocalState.isDisliked ? 'text-red-500' : ''}`}
                    onClick={
                      articleLocalState.isDisliked
                        ? () => handleCancelDislike(userData, props, setArticleLocalState)
                        : () => handleDislike(userData, props, articleLocalState, setArticleLocalState)
                    }
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Article;
