import {
  apiCreatePublicationReputation,
  apiDeletePublicationReputation,
  apiUpdatePublicationReputation
} from '../api/publications';
import { apiAddFavoritePublication, apiDeleteFavoritePublication } from '../api/users';
import { notification } from 'antd';

export const handleDislike = async (userData, props, publicationLocalState, setPublicationLocalState) => {
  if (userData) {
    if (publicationLocalState.isLiked) {
      const response = await apiUpdatePublicationReputation(props.idPublication, {
        id_user: userData.id_user,
        reputation_value: -1
      });
      if (response.ok) {
        setPublicationLocalState((prevState) => ({
          ...prevState,
          isLiked: false,
          isDisliked: true,
          reputation: prevState.reputation - 2
        }));
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
      const response = await apiCreatePublicationReputation(props.idPublication, {
        id_user: userData.id_user,
        reputation_value: -1
      });
      if (response.ok) {
        setPublicationLocalState((prevState) => ({
          ...prevState,
          isDisliked: true,
          reputation: prevState.reputation - 1
        }));
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
    }
  } else {
    notification.error({
      message: "Action impossible, vous n'êtes pas connecté(e)"
    });
  }
};

export const handleLike = async (userData, props, publicationLocalState, setPublicationLocalState) => {
  if (userData) {
    if (publicationLocalState.isDisliked) {
      const response = await apiUpdatePublicationReputation(props.idPublication, {
        id_user: userData.id_user,
        reputation_value: 1
      });
      if (response.ok) {
        setPublicationLocalState((prevState) => ({
          ...prevState,
          isLiked: true,
          isDisliked: false,
          reputation: prevState.reputation + 2
        }));
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
      const response = await apiCreatePublicationReputation(props.idPublication, {
        id_user: userData.id_user,
        reputation_value: 1
      });
      if (response.ok) {
        setPublicationLocalState((prevState) => ({
          ...prevState,
          isLiked: true,
          reputation: prevState.reputation + 1
        }));
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
    }
  } else {
    notification.error({
      message: "Action impossible, vous n'êtes pas connecté(e)"
    });
  }
};

export const handleCancelDislike = async (userData, props, setPublicationLocalState) => {
  if (userData) {
    const response = await apiDeletePublicationReputation(props.idPublication, {
      id_user: userData.id_user
    });
    if (response.ok) {
      setPublicationLocalState((prevState) => ({
        ...prevState,
        isDisliked: false,
        reputation: prevState.reputation + 1
      }));
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

export const handleCancelLike = async (userData, props, setPublicationLocalState) => {
  if (userData) {
    const response = await apiDeletePublicationReputation(props.idPublication, {
      id_user: userData.id_user
    });
    if (response.ok) {
      setPublicationLocalState((prevState) => ({
        ...prevState,
        isLiked: false,
        reputation: prevState.reputation - 1
      }));
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

export const handleFavorite = async (userData, props, setPublicationLocalState) => {
  if (userData) {
    const response = await apiAddFavoritePublication(userData.id_user, {
      id_publication: props.idPublication
    });
    if (response.ok) {
      setPublicationLocalState((prevState) => ({
        ...prevState,
        isFavorite: true
      }));
      notification.success({
        message: `Publication ${props.idPublication} ajoutée aux favoris`
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

export const handleCancelFavorite = async (userData, props, setPublicationLocalState) => {
  if (userData) {
    const response = await apiDeleteFavoritePublication(userData.id_user, {
      id_publication: props.idPublication
    });
    if (response.ok) {
      setPublicationLocalState((prevState) => ({
        ...prevState,
        isFavorite: false
      }));
      notification.success({
        message: `Publication ${props.idPublication} supprimée des favoris`
      });
    } else {
      const error = await response.json();
      notification.error({
        message: 'Erreur lors de la suppression du favori',
        description: error.message
      });
    }
  } else {
    notification.error({
      message: "Action impossible, vous n'êtes pas connecté(e)"
    });
  }
};
