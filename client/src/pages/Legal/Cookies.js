const CookiesPage = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-3">Utilisation des cookies</h2>
      <p className="mb-3">
        Nous utilisons des cookies pour stocker votre identifiant d'utilisateur, votre nom d'utilisateur et votre rôle
        afin de vérifier vos droits sur l'application. Ces cookies ne permettent uniquement que la connexion pour
        l'utilisateur.
      </p>
      <p>Durée de validité des cookies (accès) : 1 heure.</p>
      <p>Durée de validité des cookies (rafraîchissement de l'accès) : 24 heures.</p>
    </div>
  );
};

export default CookiesPage;
