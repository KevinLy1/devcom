import React from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import PublicationForm from '../../components/Forms/PublicationForm';

const PublicationPage = () => {
  useDocumentTitle('Créer une publication');

  return <PublicationForm />;
};

export default PublicationPage;
