Créer un fichier .env avec les informations de connexion à la base de données

Pour générer un certificat SSL en local, utiliser "mkcert" dans le dossier "certs" (à créer à la racine du server)

Exemple :
```shell
# Environment
NODE_ENV = production

# Certificats (si NODE_ENV = production)
# chemin vers le fichier de clé privée du certificat SSL
CERT_PRIVATE_KEY_PATH = ./certs/localhost-key.pem
# chemin vers le fichier de clé publique du certificat SSL
CERT_PUBLIC_KEY_PATH = ./certs/localhost.pem
# autorité de certification
CA_PATH = 

# Database Connection
DB_HOST = localhost
DB_PORT = 3306
DB_DIALECT = mariadb
DB_NAME = devcom
DB_USER = root
DB_PASSWORD = root

# Server port
SERVER_PORT = 4000

# BCRYPT
BCRYPT_SALT_ROUNDS = 10

# JWT
JWT_SECRET_KEY = SECRET_KEY # Utiliser "yarn crypto" pour générer une clé secrète et remplacer SECRET_KEY
JWT_EXPIRATION = 900 # 900 seconds (15 minutes)
JWT_COOKIE_EXPIRATION = 900000 # 900 milliseconds (15 minutes)
```
