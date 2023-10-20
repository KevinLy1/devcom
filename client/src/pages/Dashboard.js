import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Button } from '@material-tailwind/react';

const DashboardPage = () => {
  useDocumentTitle('Tableau de bord');

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">Bienvenue sur votre tableau de bord !</h2>
      <p>Diverses actions peuvent être effectuées à partir du tableau de bord :</p>
      <Link to="/profile">
        <Button className="w-full">Éditer votre profil</Button>
      </Link>
      <Link to="/my-publications">
        <Button className="w-full">Gérer mes publications</Button>
      </Link>
      <Link to="/my-favorites">
        <Button className="w-full">Consulter mes favoris</Button>
      </Link>
    </div>
  );
};

export default DashboardPage;
