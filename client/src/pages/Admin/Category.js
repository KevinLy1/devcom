import useDocumentTitle from '../../hooks/useDocumentTitle';
import CategoryForm from '../../components/Forms/CategoryForm';
import { useParams } from 'react-router-dom';

const AdminCategoryPage = () => {
  const { id } = useParams();

  useDocumentTitle(id ? 'Éditer la catégorie' : 'Créer une catégorie');

  return <CategoryForm editMode={id ? true : false} currentCategory={id} />;
};

export default AdminCategoryPage;
