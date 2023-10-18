Créer un fichier .env avec les informations de connexion à la base de données

Pour générer un certificat SSL en local, utiliser "mkcert" dans le dossier "certs" (à créer à la racine du server)

Exemple :
```shell
# Environnement
NODE_ENV = production

# CORS
CORS_ORIGIN = http://localhost:3000 # l'URL du client

# Certificats (si NODE_ENV = production)
# chemin vers le fichier de clé privée du certificat SSL
CERT_PRIVATE_KEY_PATH = ./certs/localhost-key.pem
# chemin vers le fichier de clé publique du certificat SSL
CERT_PUBLIC_KEY_PATH = ./certs/localhost.pem
# autorité de certification
CA_PATH = 

# Connexion à la base de données
DB_HOST = localhost
DB_PORT = 3306
DB_DIALECT = mariadb
DB_NAME = devcom
DB_USER = root
DB_PASSWORD = root

# Pour du serveur
SERVER_PORT = 4000

# BCRYPT
BCRYPT_SALT_ROUNDS = 10

# JWT
JWT_SECRET_KEY = SECRET_KEY # Utiliser "yarn crypto" pour générer une clé secrète et remplacer SECRET_KEY
REFRESH_JWT_SECRET_KEY = SECRET_KEY_2 # Utiliser encore "yarn crypto" pour générer une autre clé secrète et remplacer SECRET_KEY_2
JWT_EXPIRATION = 3600 # 3600 secondes (60 minutes)
REFRESH_JWT_EXPIRATION = 86400 # 86400 secondes (1 jour)
JWT_COOKIE_EXPIRATION = 3600000 # 3600000 millisecondes (60 minutes)
REFRESH_JWT_COOKIE_EXPIRATION = 86400000 # 86400000 millisecondes (1 jour)
```
