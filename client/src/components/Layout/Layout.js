// import Footer from './Footer';
import { Header } from './Header';
import { Footer } from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="font-default min-h-screen flex flex-col bg-gray-100 dark:bg-slate-900 dark:text-white">
      <Header />

      <main className="container mx-auto px-4 py-28 flex-1">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
