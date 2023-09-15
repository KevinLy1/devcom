import useUser from '../hooks/useUser';

const UserPage = () => {
  const user = useUser();
  console.log(user);
  return <>Détail de {user.username}</>;
};

export default UserPage;
