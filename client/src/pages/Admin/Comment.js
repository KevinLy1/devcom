import useDocumentTitle from '../../hooks/useDocumentTitle';
import AdminCommentForm from '../../components/Forms/Admin/AdminCommentForm';
import { useParams } from 'react-router-dom';

const AdminCommentPage = () => {
  const { id } = useParams();

  useDocumentTitle('Modération du commentaire');

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl text-center">Modération du commentaire</h2>
      <AdminCommentForm currentComment={id} />
    </div>
  );
};

export default AdminCommentPage;
