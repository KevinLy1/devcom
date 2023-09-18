import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Card, CardHeader, CardBody, CardFooter, Button } from '@material-tailwind/react';
import { FiMessageCircle } from 'react-icons/fi';
import { AiOutlineStar } from 'react-icons/ai';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { apiAddFavoritePublication, apiDeleteFavoritePublication } from '../../api/users';
import {
  apiCreatePublicationReputation,
  apiDeletePublicationReputation
} from '../../api/publications';
import { notification } from 'antd';

const ArticleCard = (props) => {
  const { userData } = useAuth();

  const categories =
    props.categories.length > 0
      ? props.categories.map((category) => ({
          id_category: category.id_category,
          title: category.title
        }))
      : [];

  let totalReputation = 0;
  if (props.reputation.length > 0) {
    for (let i = 0; i < props.reputation.length; i++) {
      totalReputation += props.reputation[i].reputation_value;
    }
  }

  const nbComments = props.comments.length > 0 ? props.comments.length : 0;

  const handleDislike = async () => {
    if (userData) {
      const response = await apiCreatePublicationReputation(props.idPublication, {
        id_user: userData.id_user,
        reputation_value: -1
      });
      if (response.ok) {
        notification.success({
          message: `Dislike de la publication ${props.idPublication}`
        });
      } else {
        const error = await response.json();
        notification.error({
          message: 'Erreur lors du dislike',
          description: error.message
        });
      }
    } else {
      notification.error({
        message: "Action impossible, vous n'êtes pas connecté(e)"
      });
    }
  };

  const handleLike = async () => {
    if (userData) {
      const response = await apiCreatePublicationReputation(props.idPublication, {
        id_user: userData.id_user,
        reputation_value: 1
      });
      if (response.ok) {
        notification.success({
          message: `Like de la publication ${props.idPublication}`
        });
      } else {
        const error = await response.json();
        notification.error({
          message: 'Erreur lors du like',
          description: error.message
        });
      }
    } else {
      notification.error({
        message: "Action impossible, vous n'êtes pas connecté(e)"
      });
    }
  };

  const handleFavorite = async () => {
    if (userData) {
      const response = await apiAddFavoritePublication(userData.id_user, {
        id_publication: props.idPublication
      });
      if (response.ok) {
        notification.success({
          message: `Publication ${props.idPublication} ajoutée aux favoris !`
        });
      } else {
        const error = await response.json();
        notification.error({
          message: "Erreur lors de l'ajout du favori",
          description: error.message
        });
      }
    } else {
      notification.error({
        message: "Action impossible, vous n'êtes pas connecté(e)"
      });
    }
  };

  const handleCancelDislike = async () => {
    if (userData) {
      const response = await apiDeletePublicationReputation(props.idPublication, {
        id_user: userData.id_user
      });
      if (response.ok) {
        notification.success({
          message: `Dislike de la publication ${props.idPublication} annulé`
        });
      } else {
        const error = await response.json();
        notification.error({
          message: "Erreur lors de l'annulation du dislike",
          description: error.message
        });
      }
    } else {
      notification.error({
        message: "Action impossible, vous n'êtes pas connecté(e)"
      });
    }
  };

  const handleCancelLike = async () => {
    if (userData) {
      const response = await apiDeletePublicationReputation(props.idPublication, {
        id_user: userData.id_user
      });
      if (response.ok) {
        notification.success({
          message: `Like de la publication ${props.idPublication} annulé`
        });
      } else {
        const error = await response.json();
        notification.error({
          message: "Erreur lors de l'annulation du like",
          description: error.message
        });
      }
    } else {
      notification.error({
        message: "Action impossible, vous n'êtes pas connecté(e)"
      });
    }
  };

  const handleRemoveFavorite = async () => {
    if (userData) {
      const response = await apiDeleteFavoritePublication(userData.id_user, {
        id_publication: props.idPublication
      });
      if (response.ok) {
        notification.success({
          message: `Publication ${props.idPublication} supprimée des favoris !`
        });
      } else {
        const error = await response.json();
        notification.error({
          message: 'Erreur lors de la suppresion du favori',
          description: error.message
        });
      }
    } else {
      notification.error({
        message: "Action impossible, vous n'êtes pas connecté(e)"
      });
    }
  };

  return (
    <Card className="w-full flex-col bg-white dark:bg-slate-950/90">
      {props.image && (
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-full shrink-0 rounded-b-none hidden md:block h-44">
          <img src={props.image} alt={props.title} className="h-full w-full object-cover" />
        </CardHeader>
      )}
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
            <Link
              to={`/user/${props.idUser}`}
              className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">
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
            className={`cursor-pointer ${props.isLiked ? 'text-green-500' : ''}`}
            onClick={props.isLiked ? handleCancelLike : handleLike}
          />
          {totalReputation}
          <FaThumbsDown
            className={`cursor-pointer ${props.isDisliked ? 'text-red-500' : ''}`}
            onClick={props.isDisliked ? handleCancelDislike : handleDislike}
          />
          <AiOutlineStar
            className={`cursor-pointer ${props.isFavorite ? 'text-yellow-500' : ''}`}
            onClick={props.isFavorite ? handleRemoveFavorite : handleFavorite}
          />
        </div>
        Partager
        <div className="flex items-center gap-1">
          <FiMessageCircle className="text-gray-500 dark:text-gray-400" />
          <span className="text-gray-500 dark:text-gray-400">{nbComments}</span>
          {/* <Link to={`/article/${props.idPublication}#comments`}>
            <span className="text-gray-500 dark:text-gray-400">{nbComments}</span>
          </Link> */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
