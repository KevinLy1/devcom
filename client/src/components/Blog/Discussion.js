import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@material-tailwind/react';
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
        <Breadcrumbs separator=">" className="bg-gray-500 dark:bg-slate-900">
          <Link to="/" className="opacity-60 dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </Link>
          <Link to="/discussions" className="opacity-60 dark:text-white">
            Discussions
          </Link>
          <span className="dark:text-white">{props.title}</span>
        </Breadcrumbs>
        <aside className="flex flex-wrap gap-2 mt-5">
          {categories.map((category) => (
            <a key={category.id_category} href={`/category/${category.id_category}`}>
              <div className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-800 dark:bg-slate-800 rounded cursor-pointer hover:bg-gray-500 dark:hover:bg-blue-900 flex items-center gap-2">
                <FaTag /> {category.title}
              </div>
            </a>
          ))}
        </aside>
        <h1 className="text-3xl font-extrabold leading-tight lg:text-4xl">{props.title}</h1>
        <p className="italic mb-5">{props.description}</p>
      </div>
      <div className="flex flex-col">
        <address className="flex items-center p-2 not-italic bg-gray-500 dark:bg-slate-950 rounded-tl-2xl rounded-tr-2xl">
          <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            <img className="mr-4 w-16 h-16 rounded-full" src={props.authorAvatar} alt={props.author} />
            <div>
              <Link to={`/user/${props.idUser}`} rel="author" className="text-xl font-bold">
                {props.author}
              </Link>
              <p className="text-base font-light text-gray-700 dark:text-gray-400 inline">
                , le <time>{props.dateCreation}</time>
              </p>
            </div>
          </div>
        </address>
        <div className="flex justify-between mx-auto">
          <article className="mx-auto w-full px-5 pt-5 pb-10 bg-white dark:bg-slate-800 rounded-bl-2xl rounded-br-2xl text-justify">
            {props.image && (
              <div className="w-full h-52 max-h-52 mb-10">
                <img src={props.image} alt={props.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div>{props.content}</div>
            {props.dateUpdate !== null && (
              <div className="font-semibold">
                <br />
                Dernière mise à jour : <time>{props.dateUpdate}</time>
              </div>
            )}
            <div>
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
                  {!articleLocalState.isFavorite
                    ? 'Ajouter la discussion aux favoris'
                    : 'Retirer la discussion des favoris'}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-16 justify-center dark:text-white text-4xl">
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
      </div>
    </>
  );
};

export default Article;
