import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import useCategories from '../../hooks/useCategories';
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem
} from '@material-tailwind/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import useAuth from '../../contexts/AuthContext';
import { notification } from 'antd';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const categories = useCategories();

  const [openNav, setOpenNav] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { userData, logout } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response === true) {
        notification.success({
          placement: 'top',
          message: 'Déconnexion réussie',
          description: `Au revoir, ${userData.username} !`
        });
      } else {
        notification.error({
          placement: 'top',
          message: 'Erreur de déconnexion'
        });
      }
    } catch (error) {
      notification.error({
        placement: 'top',
        message: 'Échec de la déconnexion',
        description: error
      });
    }
  };

  useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {categories.length > 0 && (
        <Typography as="li" variant="small" className="p-1 font-normal">
          <Menu
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 }
            }}>
            <MenuHandler>
              <span className="flex gap-3 items-center cursor-pointer text-black dark:text-white">
                Catégories <ChevronDownIcon strokeWidth={2.5} className="h-3.5 w-3.5" />
              </span>
            </MenuHandler>
            <MenuList className="bg-white dark:bg-slate-950 border-none">
              {categories.map((category) => (
                <a key={category.id_category} href={`/category/${category.id_category}`}>
                  <MenuItem className="text-black dark:text-white hover:dark:bg-slate-900 hover:border-none">
                    {category.title}
                  </MenuItem>
                </a>
              ))}
            </MenuList>
          </Menu>
        </Typography>
      )}

      <Typography as="li" variant="small" className="p-1 font-normal">
        <Link to="/articles" className="flex items-center text-black dark:text-white">
          Articles
        </Link>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <Link to="/discussions" className="flex items-center text-black dark:text-white">
          Discussions
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar
      className="fixed top-0 z-50 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-white/90 dark:bg-slate-950/90 dark:border-none
    ">
      <div className="flex items-center justify-between text-blue-gray-900 dark:text-white">
        <Link to="/" className="mr-4 cursor-pointer py-1.5 font-medium">
          <span className="text-2xl sm:text-4xl">DEV</span>
          <span className="text-2xl sm:text-3xl">.COM</span>
          <span className="text-xl sm:text-2xl">munity</span>
        </Link>
        <div className="mr-4 hidden xl:block">{navList}</div>
        <div className="flex items-center gap-4">
          {!userData ? (
            <>
              <Link to="/register">
                <Button variant="gradient" size="sm" className="hidden xl:inline-block">
                  <span>Inscription</span>
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="gradient" size="sm" className="hidden xl:inline-block">
                  <span>Connexion</span>
                </Button>
              </Link>
            </>
          ) : (
            <>
              {userData.role === 'administrator' && (
                <Link to="/admin">
                  <Button variant="gradient" size="sm" className="hidden xl:inline-block">
                    <span>Administration</span>
                  </Button>
                </Link>
              )}
              <Link to="/dashboard">
                <Button variant="gradient" size="sm" className="hidden xl:inline-block">
                  <span>Tableau de bord</span>
                </Button>
              </Link>
              <Button variant="gradient" size="sm" className="hidden xl:inline-block" onClick={handleLogout}>
                <span>Déconnexion ({userData.username})</span>
              </Button>
            </>
          )}
          <span className="cursor-pointer" onClick={() => toggleTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <FaMoon size={20} /> : <FaSun size={20} />}
          </span>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent xl:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}>
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        <div className="flex justify-center">{navList}</div>
        {!userData ? (
          <>
            <Link to="/register">
              <Button variant="gradient" size="sm" fullWidth className="mb-2">
                <span>Inscription</span>
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="gradient" size="sm" fullWidth className="mb-2">
                <span>Connexion</span>
              </Button>
            </Link>
          </>
        ) : (
          <>
            {userData.role === 'administrator' && (
              <Link to="/admin">
                <Button variant="gradient" size="sm" fullWidth className="mb-2">
                  <span>Administration</span>
                </Button>
              </Link>
            )}
            <Link to="/dashboard">
              <Button variant="gradient" size="sm" fullWidth className="mb-2">
                <span>Tableau de bord</span>
              </Button>
            </Link>
            <Link to="/logout">
              <Button variant="gradient" size="sm" fullWidth className="mb-2" onClick={handleLogout}>
                <span>Déconnexion ({userData.username})</span>
              </Button>
            </Link>
          </>
        )}
      </Collapse>
    </Navbar>
  );
};

export default Header;
