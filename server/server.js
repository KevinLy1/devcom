const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT;

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true // Autorise l'envoi de cookies
  })
);

if (process.env.NODE_ENV !== 'production') {
  const logger = require('morgan');
  app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/publications', require('./src/routes/publications'));
app.use('/api/comments', require('./src/routes/comments'));
app.use('/api/categories', require('./src/routes/categories'));
app.use('/api/images', require('./src/routes/images'));

// Routes admin
app.use('/api/admin/users', require('./src/routes/admin/users'));
app.use('/api/admin/publications', require('./src/routes/admin/publications'));
app.use('/api/admin/comments', require('./src/routes/admin/comments'));
app.use('/api/admin/categories', require('./src/routes/admin/categories'));

// Démarrer le serveur
if (process.env.NODE_ENV === 'production') {
  const fs = require('fs');
  const https = require('https');

  const httpsServer = https.createServer(
    {
      key: fs.readFileSync(process.env.CERT_PRIVATE_KEY_PATH),
      cert: fs.readFileSync(process.env.CERT_PUBLIC_KEY_PATH)
    },
    app
  );

  httpsServer.listen(port, () => {
    console.log(`HTTPS server started on port ${port}`);
  });
} else {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

module.exports = app;
