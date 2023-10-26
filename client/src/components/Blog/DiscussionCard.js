import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar
  // Button
  // Menu, MenuHandler, MenuList, MenuItem
} from '@material-tailwind/react';
import {
  FaThumbsUp,
  FaThumbsDown,
  // FaLink,
  // FaShareAlt,
  FaStar,
  FaTag
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import {
  handleLike,
  handleDislike,
  handleCancelLike,
  handleCancelDislike,
  handleFavorite,
  handleCancelFavorite
} from '../../actions/publicationActions';
// import { notification } from 'antd';

const DiscussionCard = (props) => {
  const { userData } = useAuth();

  const [discussionLocalState, setDiscussionLocalState] = useState({
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
    setDiscussionLocalState((prevState) => ({
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
    <div className="flex items-center justify-center">
      {' '}
      <div className="rounded-xl border p-5 shadow-md w-full bg-white dark:bg-slate-950/50">
        <div className="flex w-full items-center justify-between border-b pb-3 flex-wrap">
          <div className="flex items-center space-x-3">
            <Avatar
              src={
                props.authorAvatar
                  ? `${process.env.REACT_APP_SERVER_UPLOADS_URL}/${props.authorAvatar}`
                  : '/assets/img/default-avatar.svg'
              }
              alt="avatar"
            />
            <Link to={`/user/${props.idUser}`}>
              <div className="text-lg font-bold">{props.author}</div>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="text-xs text-neutral-500">{props.dateCreation}</div>
          </div>
        </div>

        <div className="mt-4 mb-6 relative">
          <FaStar
            className={`cursor-pointer absolute top-2 right-2 ${
              discussionLocalState.isFavorite ? 'text-yellow-500' : ''
            }`}
            onClick={
              discussionLocalState.isFavorite
                ? () => handleCancelFavorite(userData, props, setDiscussionLocalState)
                : () => handleFavorite(userData, props, setDiscussionLocalState)
            }
          />
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {categories.map((category) => (
              <a key={category.id_category} href={`/category/${category.id_category}`}>
                <button
                  key={category.id_category}
                  className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold flex items-center">
                  <FaTag className="mr-2" /> {category.title}
                </button>
              </a>
            ))}
          </div>
          <Link to={`/discussion/${props.idPublication}`} className="mb-3 text-xl font-bold">
            {props.title}
          </Link>
          <div className="text-sm text-neutral-600 mt-4">{props.description}</div>
          <span className="text-sm font-light dark:text-gray-400">
            {props.dateUpdate && (
              <>
                <br />
                Dernière édition le {props.dateUpdate}
              </>
            )}
          </span>
        </div>

        <div className="flex space-x-4 md:space-x-8 items-center justify-between">
          <div className="flex items-center gap-2 dark:text-white">
            <FaThumbsUp
              className={`cursor-pointer ${discussionLocalState.isLiked ? 'text-green-500' : ''}`}
              onClick={
                discussionLocalState.isLiked
                  ? () => handleCancelLike(userData, props, setDiscussionLocalState)
                  : () => handleLike(userData, props, discussionLocalState, setDiscussionLocalState)
              }
            />
            {discussionLocalState.reputation}
            <FaThumbsDown
              className={`cursor-pointer ${discussionLocalState.isDisliked ? 'text-red-500' : ''}`}
              onClick={
                discussionLocalState.isDisliked
                  ? () => handleCancelDislike(userData, props, setDiscussionLocalState)
                  : () => handleDislike(userData, props, discussionLocalState, setDiscussionLocalState)
              }
            />
          </div>
          <div className="flex items-center transition hover:text-slate-600 dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1.5 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span>{nbComments}</span>
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
                  const link = `${process.env.REACT_APP_CLIENT_URL}/discussion/${props.idPublication}`;
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
      </div>
    </div>
  );
};

export default DiscussionCard;
