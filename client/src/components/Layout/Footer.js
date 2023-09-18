import { Typography } from '@material-tailwind/react';

const Footer = () => {
  const publishingYear = 2023;
  let currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-slate-950 p-4">
      <div className="flex items-center justify-center gap-y-6 gap-x-12 bg-white dark:bg-slate-950 text-center">
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography as="a" href="#" className="font-normal transition-colors">
              À propos
            </Typography>
          </li>
          <li>
            <Typography as="a" href="#" className="font-normal transition-colors">
              Cookies
            </Typography>
          </li>
          <li>
            <Typography as="a" href="#" className="font-normal transition-colors">
              Contact
            </Typography>
          </li>
        </ul>
      </div>
      <Typography className="text-center font-normal">
        Copyright &copy; DevCom -{' '}
        {currentYear === publishingYear ? publishingYear : `${publishingYear}-${currentYear}`}. Tous
        droits réservés.
      </Typography>
    </footer>
  );
};

export default Footer;
