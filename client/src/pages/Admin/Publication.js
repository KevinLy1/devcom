import useDocumentTitle from '../../hooks/useDocumentTitle';
import AdminPublicationForm from '../../components/Forms/Admin/AdminPublicationForm';
import { useParams } from 'react-router-dom';

const AdminPublicationPage = () => {
  const { id } = useParams();

  useDocumentTitle('Éditer la publication');

  return <AdminPublicationForm currentPublication={id} />;
};

export default AdminPublicationPage;
