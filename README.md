# DEV.COMmunity

Version de Node.js : v18.17.0

Pour installer le projet en local :

```sh
git clone https://github.com/KevinLy1/devcom.git
```

## Instructions pour le client

Aller dans le dossier "client",

```sh
yarn install
```

pour installer les dépendances.

## Instructions pour le serveur

Aller dans le dossier "server",

```sh
yarn install
```

pour installer les dépendances.

À la racine du dossier "server", créer deux dossiers : "uploads" (nécessaire pour l'upload d'images) et "certs" (nécessaire pour HTTPS, en production).
Pour générer un certificat SSL en local, utiliser "mkcert" dans le dossier "certs". \
Pour plus d'informations à propos de mkcert : [ici](https://github.com/FiloSottile/mkcert)

Enfin, créer un fichier ".env", toujours à la racine.

Exemple :
```shell
# Environnement
NODE_ENV = development

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

## Lancer l'application en local

Aller dans le dossier "client",

```sh
yarn start
```

pour démarer le client ([http:localhost:3000/](http:localhost:3000/) par défaut).

Aller dans le dossier "server",

```sh
yarn nodemon
```

pour démarer le serveur ([http:localhost:4000/](http:localhost:3000/) par défaut).