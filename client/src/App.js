import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import UserRoute from './routes/UserRoute';
import AdminRoute from './routes/AdminRoute';
import GuestRoute from './routes/GuestRoute';
import Layout from './components/Layout/Layout';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/Dashboard/Profile';
import AdminDashboardPage from './pages/Admin/Dashboard';
import ArticlesPage from './pages/Articles';
import ArticlePage from './pages/Article';
import CategoryPage from './pages/Category';
import DiscussionsPage from './pages/Discussions';
import DiscussionPage from './pages/Discussion';
import UserPage from './pages/User';
import DashboardPage from './pages/Dashboard';
import ScrollToTop from './hooks/ScrollToTop';
import CookiesPage from './pages/Legal/Cookies';
import PrivacyPolicyPage from './pages/Legal/PrivacyPolicy';
import PublicationPage from './pages/Dashboard/Publication';
import MyFavoritesPage from './pages/Dashboard/MyFavorites';
import MyPublicationsPage from './pages/Dashboard/MyPublications';
import EditPublicationPage from './pages/Dashboard/EditPublication';
import AdminCategoriesPage from './pages/Admin/Categories';
import AdminPublicationsPage from './pages/Admin/Publications';
import AdminPublicationPage from './pages/Admin/Publication';
// import AdminEditCategoriesPage from './pages/Admin/EditCategory';
// import AdminNewCategoryPage from './pages/Admin/NewCategory';
import AdminCommentsPage from './pages/Admin/Comments';
import AdminCommentPage from './pages/Admin/Comment';
import AdminUsersPage from './pages/Admin/Users';
import AdminUserPage from './pages/Admin/User';
import UnauthorizedPage from './pages/Unauthorized';
import AdminCategoryPage from './pages/Admin/Category';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <ScrollToTop />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/discussions" element={<DiscussionsPage />} />
            <Route path="/discussion/:id" element={<DiscussionPage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Guest only routes */}
            <Route element={<GuestRoute />}>
              <Route exact path="/register" element={<RegisterPage />} />
              <Route exact path="/login" element={<LoginPage />} />
            </Route>

            {/* User only routes */}
            <Route element={<UserRoute />}>
              <Route exact path="/dashboard" element={<DashboardPage />} />
              <Route exact path="/profile" element={<ProfilePage />} />
              <Route exact path="/my-favorites" element={<MyFavoritesPage />} />
              <Route exact path="/my-publications" element={<MyPublicationsPage />} />
              <Route exact path="/publication/new" element={<PublicationPage />} />
              <Route exact path="/publication/:id/edit" element={<EditPublicationPage />} />
            </Route>

            {/* Admin only routes */}
            <Route element={<AdminRoute />}>
              <Route exact path="/admin" element={<AdminDashboardPage />} />

              <Route exact path="/admin/users" element={<AdminUsersPage />} />
              <Route exact path="/admin/user/:id/edit" element={<AdminUserPage />} />

              <Route exact path="/admin/categories" element={<AdminCategoriesPage />} />
              <Route exact path="/admin/category/new" element={<AdminCategoryPage />} />
              <Route exact path="/admin/category/:id/edit" element={<AdminCategoryPage />} />

              <Route exact path="/admin/publications" element={<AdminPublicationsPage />} />
              <Route exact path="/admin/publication/:id/edit/" element={<AdminPublicationPage />} />

              <Route exact path="/admin/comments" element={<AdminCommentsPage />} />
              <Route exact path="/admin/comment/:id/edit" element={<AdminCommentPage />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
