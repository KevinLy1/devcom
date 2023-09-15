import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import RegistrationForm from '../components/Forms/RegistrationForm';

const RegisterPage = () => {
  useDocumentTitle('Inscription');

  return <RegistrationForm />;
};

export default RegisterPage;
