import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem
} from '@material-tailwind/react';
import { FiMessageCircle } from 'react-icons/fi';
import { FaThumbsUp, FaThumbsDown, FaBookmark, FaClipboard, FaEllipsisH } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import {
  handleLike,
  handleDislike,
  handleCancelLike,
  handleCancelDislike,
  handleFavorite,
  handleCancelFavorite
} from '../../actions/publicationActions';
import { notification } from 'antd';

const ArticleCard = (props) => {
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

  const nbComments = props.comments.length > 0 ? props.comments.length : 0;

  const categories =
    props.categories.length > 0
      ? props.categories.map((category) => ({
          id_category: category.id_category,
          title: category.title
        }))
      : [];

  return (
    <Card className="w-full flex-col bg-white dark:bg-slate-950/90">
      <CardHeader shadow={false} floated={false} className="m-0 w-full shrink-0 rounded-b-none hidden md:block h-44">
        <img
          src={props.image ? props.image : '/assets/img/default-publication.svg'}
          alt={props.title}
          className="h-full w-full object-cover"
        />
      </CardHeader>

      <CardBody>
        <div className="flex items-center justify-between">
          <span className="text-sm font-light dark:text-gray-400">
            Publié le {props.dateCreation}
            {props.dateUpdate && (
              <>
                <br />
                Édité le {props.dateUpdate}
              </>
            )}
          </span>
          <div className="flex space-x-2">
            {categories.map((category) => (
              <Link key={category.id_category} to={`/category/${category.id_category}`}>
                <div className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-800 dark:bg-slate-800 rounded cursor-pointer hover:bg-gray-500 dark:hover:bg-gray-700">
                  {category.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Link
          to={`/article/${props.idPublication}`}
          className="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">
          #{props.idPublication} – {props.title}
        </Link>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{props.description}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Avatar src={props.authorAvatar} alt="avatar" />
            <Link to={`/user/${props.idUser}`} className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">
              {props.author}
            </Link>
          </div>
          <Link to={`/article/${props.idPublication}`} className="inline-block">
            <Button className="flex items-center gap-2">Lire la suite ⟶</Button>
          </Link>
        </div>
      </CardBody>
      <CardFooter className="mt-2 flex justify-between">
        <div className="flex items-center gap-1 dark:text-white">
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
          <FaBookmark
            className={`cursor-pointer ${articleLocalState.isFavorite ? 'text-yellow-500' : ''}`}
            onClick={
              articleLocalState.isFavorite
                ? () => handleCancelFavorite(userData, props, setArticleLocalState)
                : () => handleFavorite(userData, props, setArticleLocalState)
            }
          />
        </div>
        <Menu>
          <MenuHandler>
            <Button>
              <FaEllipsisH />
            </Button>
          </MenuHandler>
          <MenuList>
            <MenuItem
              onClick={() => {
                const link = `${process.env.REACT_APP_CLIENT_URL}/article/${props.idPublication}`;
                navigator.clipboard.writeText(link);
                notification.success({
                  message: 'Lien copié dans le presse-papier',
                  description: link
                });
              }}>
              Copier le lien <FaClipboard className="inline-block" />
            </MenuItem>
          </MenuList>
        </Menu>
        <div className="flex items-center gap-1">
          <FiMessageCircle className="text-gray-500 dark:text-gray-400" />
          <span className="text-gray-500 dark:text-gray-400">{nbComments}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
