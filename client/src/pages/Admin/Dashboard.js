import { Link } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Button } from '@material-tailwind/react';

const AdminDashboardPage = () => {
  useDocumentTitle('Administration');

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">Bienvenue sur le tableau de bord administrateur !</h2>
      <p>Diverses actions peuvent être effectuées à partir du tableau de bord :</p>
      <Link to="/admin/users">
        <Button className="w-full">Gestion des utilisateurs</Button>
      </Link>
      <Link to="/admin/categories">
        <Button className="w-full">Gestion des catégories</Button>
      </Link>
      <Link to="/admin/publications">
        <Button className="w-full">Gestion des publications</Button>
      </Link>
      <Link to="/admin/comments">
        <Button className="w-full">Gestion des commentaires</Button>
      </Link>
    </div>
  );
};

export default AdminDashboardPage;
