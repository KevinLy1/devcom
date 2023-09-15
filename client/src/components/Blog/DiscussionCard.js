import { Link } from 'react-router-dom';
// import { Avatar, Card, CardHeader, CardBody, CardFooter } from '@material-tailwind/react';
// import { FiMessageCircle } from 'react-icons/fi';
// import { AiOutlineStar } from 'react-icons/ai';
// import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
// import { useAuth } from '../../contexts/AuthContext';
// import { apiAddFavoritePublication, apiDeleteFavoritePublication } from '../../api/users';
// import {
//   apiCreatePublicationReputation,
//   apiDeletePublicationReputation
// } from '../../api/publications';
// import { notification } from 'antd';

export function DiscussionCard(props) {
  // const { userData } = useAuth();

  const categoriesTitles =
    props.categories.length > 0 ? props.categories.map((category) => category.title) : [];

  let totalReputation = 0;
  if (props.reputation.length > 0) {
    for (let i = 0; i < props.reputation.length; i++) {
      totalReputation += props.reputation[i].reputation_value;
    }
  }

  const nbComments = props.comments.length > 0 ? props.comments.length : 0;

  // const handleDislike = async () => {
  //   if (userData) {
  //     const response = await apiCreatePublicationReputation(props.idPublication, {
  //       id_user: userData.id_user,
  //       reputation_value: -1
  //     });
  //     if (response.ok) {
  //       notification.success({
  //         message: `Dislike de la publication ${props.idPublication}`
  //       });
  //     } else {
  //       const error = await response.json();
  //       notification.error({
  //         message: 'Erreur lors du dislike',
  //         description: error.message
  //       });
  //     }
  //   } else {
  //     notification.error({
  //       message: "Action impossible, vous n'êtes pas connecté(e)"
  //     });
  //   }
  // };

  // const handleLike = async () => {
  //   if (userData) {
  //     const response = await apiCreatePublicationReputation(props.idPublication, {
  //       id_user: userData.id_user,
  //       reputation_value: 1
  //     });
  //     if (response.ok) {
  //       notification.success({
  //         message: `Like de la publication ${props.idPublication}`
  //       });
  //     } else {
  //       const error = await response.json();
  //       notification.error({
  //         message: 'Erreur lors du like',
  //         description: error.message
  //       });
  //     }
  //   } else {
  //     notification.error({
  //       message: "Action impossible, vous n'êtes pas connecté(e)"
  //     });
  //   }
  // };

  // const handleFavorite = async () => {
  //   if (userData) {
  //     const response = await apiAddFavoritePublication(userData.id_user, {
  //       id_publication: props.idPublication
  //     });
  //     if (response.ok) {
  //       notification.success({
  //         message: `Publication ${props.idPublication} ajoutée aux favoris !`
  //       });
  //     } else {
  //       const error = await response.json();
  //       notification.error({
  //         message: "Erreur lors de l'ajout du favori",
  //         description: error.message
  //       });
  //     }
  //   } else {
  //     notification.error({
  //       message: "Action impossible, vous n'êtes pas connecté(e)"
  //     });
  //   }
  // };

  // const handleCancelDislike = async () => {
  //   if (userData) {
  //     const response = await apiDeletePublicationReputation(props.idPublication, {
  //       id_user: userData.id_user
  //     });
  //     if (response.ok) {
  //       notification.success({
  //         message: `Dislike de la publication ${props.idPublication} annulé`
  //       });
  //     } else {
  //       const error = await response.json();
  //       notification.error({
  //         message: "Erreur lors de l'annulation du dislike",
  //         description: error.message
  //       });
  //     }
  //   } else {
  //     notification.error({
  //       message: "Action impossible, vous n'êtes pas connecté(e)"
  //     });
  //   }
  // };

  // const handleCancelLike = async () => {
  //   if (userData) {
  //     const response = await apiDeletePublicationReputation(props.idPublication, {
  //       id_user: userData.id_user
  //     });
  //     if (response.ok) {
  //       notification.success({
  //         message: `Like de la publication ${props.idPublication} annulé`
  //       });
  //     } else {
  //       const error = await response.json();
  //       notification.error({
  //         message: "Erreur lors de l'annulation du like",
  //         description: error.message
  //       });
  //     }
  //   } else {
  //     notification.error({
  //       message: "Action impossible, vous n'êtes pas connecté(e)"
  //     });
  //   }
  // };

  // const handleRemoveFavorite = async () => {
  //   if (userData) {
  //     const response = await apiDeleteFavoritePublication(userData.id_user, {
  //       id_publication: props.idPublication
  //     });
  //     if (response.ok) {
  //       notification.success({
  //         message: `Publication ${props.idPublication} supprimée des favoris !`
  //       });
  //     } else {
  //       const error = await response.json();
  //       notification.error({
  //         message: 'Erreur lors de la suppresion du favori',
  //         description: error.message
  //       });
  //     }
  //   } else {
  //     notification.error({
  //       message: "Action impossible, vous n'êtes pas connecté(e)"
  //     });
  //   }
  // };

  return (
    <div className="flex items-center justify-center">
      {' '}
      <div className="rounded-xl border p-5 shadow-md w-9/12 bg-white dark:bg-slate-950/50">
        <div className="flex w-full items-center justify-between border-b pb-3">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]"></div>
            <Link to={`/user/${props.idUser}`}>
              <div className="text-lg font-bold text-slate-700">{props.author}</div>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            {categoriesTitles.map((category, index) => (
              <button
                key={index}
                className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
                {category}
              </button>
            ))}
            <div className="text-xs text-neutral-500">{props.dateCreation}</div>
          </div>
        </div>

        <div className="mt-4 mb-6">
          <div className="mb-3 text-xl font-bold">
            #{props.idPublication} – {props.title}
          </div>
          <div className="text-sm text-neutral-600">{props.description}</div>
        </div>

        <div>
          <div className="flex items-center justify-between text-slate-500">
            <div className="flex space-x-4 md:space-x-8">
              <div className="flex cursor-pointer items-center transition hover:text-slate-600">
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
              <div className="flex cursor-pointer items-center transition hover:text-slate-600">
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
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
                <span>{totalReputation}</span>
                <p className="ms-20">DISLIKE/FAVORI partager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
