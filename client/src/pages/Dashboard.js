import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

const DashboardPage = () => {
  useDocumentTitle('Tableau de bord');

  return (
    <>
      Lien vers <Link to="/profile">profil</Link>
      Lien vers <Link to="/">créer publi</Link>
      Mes favoris
    </>
  );
};

export default DashboardPage;
