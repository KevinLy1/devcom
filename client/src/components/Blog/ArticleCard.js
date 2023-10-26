import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaThumbsUp,
  FaThumbsDown,
  FaStar,
  // FaShareAlt, FaLink,
  FaTag
} from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar
  // Menu,
  // MenuHandler,
  // Button,
  // MenuList,
  // MenuItem
} from '@material-tailwind/react';
import {
  handleLike,
  handleDislike,
  handleCancelLike,
  handleCancelDislike,
  handleFavorite,
  handleCancelFavorite
} from '../../actions/publicationActions';
import useAuth from '../../contexts/AuthContext';
// import { notification } from 'antd';

const ArticleCard = (props) => {
  const { userData } = useAuth();

  const [publicationLocalState, setPublicationLocalState] = useState({
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
    setPublicationLocalState((prevState) => ({
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
    <Card className="max-w-[24rem] overflow-hidden flex flex-col dark:text-white">
      <CardHeader floated={false} shadow={false} color="transparent" className="m-0 rounded-none h-64 hidden sm:block">
        <img
          src={
            props.image
              ? `${process.env.REACT_APP_SERVER_UPLOADS_URL}/${props.image}`
              : '/assets/img/default-publication.svg'
          }
          alt={props.title}
          className="object-cover w-full h-full"
        />
      </CardHeader>

      <CardBody className="relative bg-gray-50 dark:bg-slate-950 flex-1 text-blue-gray-900 dark:text-white">
        <Link to={`/user/${props.idUser}`} className="flex items-center gap-2">
          <Avatar
            size="sm"
            variant="circular"
            alt={props.author}
            src={
              props.authorAvatar
                ? `${process.env.REACT_APP_SERVER_UPLOADS_URL}/${props.authorAvatar}`
                : '/assets/img/default-avatar.svg'
            }
          />
          {props.author}
        </Link>
        <div className="flex flex-wrap gap-3 my-4">
          {categories.map((category) => (
            <a key={category.id_category} href={`/category/${category.id_category}`}>
              <div className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-800 dark:bg-slate-800 rounded cursor-pointer hover:bg-gray-500 dark:hover:bg-gray-700 flex items-center">
                <FaTag className="mr-2" /> {category.title}
              </div>
            </a>
          ))}
        </div>
        <FaStar
          className={`cursor-pointer absolute top-5 right-5 ${
            publicationLocalState.isFavorite ? 'text-yellow-500' : ''
          }`}
          onClick={
            publicationLocalState.isFavorite
              ? () => handleCancelFavorite(userData, props, setPublicationLocalState)
              : () => handleFavorite(userData, props, setPublicationLocalState)
          }
        />
        <Link to={`/article/${props.idPublication}`}>
          <Typography variant="h4">{props.title}</Typography>
        </Link>
        <Typography variant="lead" className="mt-3 font-normal">
          {props.description}
        </Typography>
      </CardBody>

      <CardFooter className="bg-gray-50 dark:bg-slate-950 flex flex-col gap-3">
        <Typography className="font-normal">Publié le : {props.dateCreation}</Typography>
        {props.dateUpdate && <Typography className="font-normal">Dernière édition le : {props.dateUpdate}</Typography>}
      </CardFooter>

      <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-950 px-10 pb-5">
        <div className="flex items-center gap-2">
          <FaThumbsUp
            className={`cursor-pointer ${publicationLocalState.isLiked ? 'text-green-500' : ''}`}
            onClick={
              publicationLocalState.isLiked
                ? () => handleCancelLike(userData, props, setPublicationLocalState)
                : () => handleLike(userData, props, publicationLocalState, setPublicationLocalState)
            }
          />
          {publicationLocalState.reputation}
          <FaThumbsDown
            className={`cursor-pointer ${publicationLocalState.isDisliked ? 'text-red-500' : ''}`}
            onClick={
              publicationLocalState.isDisliked
                ? () => handleCancelDislike(userData, props, setPublicationLocalState)
                : () => handleDislike(userData, props, publicationLocalState, setPublicationLocalState)
            }
          />
        </div>

        <div className="flex items-center gap-1">
          <FiMessageCircle className="text-gray-500 dark:text-gray-400" />
          <span className="text-gray-500 dark:text-gray-400">{nbComments}</span>
        </div>

        {/* <Menu>
          <MenuHandler>
            <Button>
              <FaShareAlt />
            </Button>
          </MenuHandler>
          <MenuList className="bg-white dark:bg-slate-950 border-none">
            <MenuItem
              onClick={() => {
                const link = `${process.env.REACT_APP_CLIENT_URL}/article/${props.idPublication}`;
                navigator.clipboard.writeText(link);
                notification.success({
                  message: 'Lien copié dans le presse-papier',
                  description: link
                });
              }}>
              <FaLink className="inline-block" /> Copier le lien
            </MenuItem>
          </MenuList>
        </Menu> */}
      </div>
    </Card>
  );
};

export default ArticleCard;
