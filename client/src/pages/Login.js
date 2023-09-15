import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import LoginForm from '../components/Forms/LoginForm';

const LoginPage = () => {
  useDocumentTitle('Connexion');

  return <LoginForm />;
};

export default LoginPage;
