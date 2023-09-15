import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/Profile';
import AdminDashboardPage from './pages/Admin/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import UserRoute from './routes/UserRoute';
import AdminRoute from './routes/AdminRoute';
import GuestRoute from './routes/GuestRoute';
import ArticlesPage from './pages/Articles';
import ArticlePage from './pages/Article';
import CategoryPage from './pages/Category';
import DiscussionsPage from './pages/Discussions';
import DiscussionPage from './pages/Discussion';
import UserPage from './pages/User';
import ScrollToTop from './hooks/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/discussions" element={<DiscussionsPage />} />
            <Route path="/discussion/:id" element={<DiscussionPage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/user/:id" element={<UserPage />} />

            {/* Guest only routes */}
            <Route exact path="/register" element={<GuestRoute />}>
              <Route exact path="/register" element={<RegisterPage />} />
            </Route>
            <Route exact path="/login" element={<GuestRoute />}>
              <Route exact path="/login" element={<LoginPage />} />
            </Route>

            {/* User only routes */}
            <Route exact path="/profile" element={<UserRoute />}>
              <Route exact path="/profile" element={<ProfilePage />} />
            </Route>

            {/* Admin only routes */}
            <Route exact path="/admin" element={<AdminRoute />}>
              <Route exact path="/admin" element={<AdminDashboardPage />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
