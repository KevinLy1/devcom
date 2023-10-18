import useDocumentTitle from '../../hooks/useDocumentTitle';
import PublicationForm from '../../components/Forms/PublicationForm';
import { useParams } from 'react-router-dom';

const AdminEditPublicationPage = () => {
  const { id } = useParams();

  useDocumentTitle('Éditer la publication');

  return <PublicationForm editMode={true} currentPublication={id} adminMode={true} />;
};

export default AdminEditPublicationPage;
