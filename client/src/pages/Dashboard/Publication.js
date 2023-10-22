import useDocumentTitle from '../../hooks/useDocumentTitle';
import PublicationForm from '../../components/Forms/PublicationForm';
import { useParams } from 'react-router-dom';

const PublicationPage = () => {
  const { id } = useParams();

  useDocumentTitle(id ? 'Éditer la publication' : 'Créer une publication');

  return <PublicationForm editMode={id ? true : false} currentPublication={id} />;
};

export default PublicationPage;
