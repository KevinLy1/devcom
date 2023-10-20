import useDocumentTitle from '../../hooks/useDocumentTitle';
import AdminUserForm from '../../components/Forms/Admin/AdminUserForm';
import { useParams } from 'react-router-dom';

const AdminUserPage = () => {
  const { id } = useParams();

  useDocumentTitle('Modifier un utilisateur');

  return <AdminUserForm currentUser={id} />;
};

export default AdminUserPage;
