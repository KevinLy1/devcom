import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown, FaStar, FaShareAlt, FaClipboard } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem
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
import { notification } from 'antd';

const BlogCard = (props) => {
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

  return (
    <Card className="max-w-[24rem] overflow-hidden flex flex-col dark:text-white">
      <CardHeader floated={false} shadow={false} color="transparent" className="m-0 rounded-none h-64">
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
        <Link to={`/${props.type}/${props.idPublication}`}>
          <Typography variant="h4">{props.title}</Typography>
        </Link>
        <Typography variant="lead" className="mt-3 font-normal">
          {props.description}
        </Typography>
      </CardBody>

      <CardFooter className="flex items-center justify-between bg-gray-50 dark:bg-slate-950">
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
        <Typography className="font-normal">{props.dateCreation}</Typography>
      </CardFooter>

      <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-950 px-5 pb-5">
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

        <Menu>
          <MenuHandler>
            <Button>
              <FaShareAlt />
            </Button>
          </MenuHandler>
          <MenuList className="bg-white dark:bg-slate-950 border-none">
            <MenuItem
              onClick={() => {
                const link = `${process.env.REACT_APP_CLIENT_URL}/${props.type}/${props.idPublication}`;
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
      </div>
    </Card>
  );
};

export default BlogCard;
