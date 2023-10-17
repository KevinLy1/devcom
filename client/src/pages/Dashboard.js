import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Button } from '@material-tailwind/react';

const DashboardPage = () => {
  useDocumentTitle('Tableau de bord');

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-center text-2xl font-bold">Bienvenue sur votre tableau de bord !</h1>
      <p>Diverses actions peuvent être effectuées à partir du tableau de bord :</p>
      <Link to="/profile">
        <Button>Éditer votre profil</Button>
      </Link>
      <Link to="/publication/new">
        <Button>Créer une nouvelle publication</Button>
      </Link>
      <Link to="/my-favorites">
        <Button>Mes favoris</Button>
      </Link>
      <Link to="/my-publications">
        <Button>Mes publications</Button>
      </Link>
    </div>
  );
};

export default DashboardPage;
