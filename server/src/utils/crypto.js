const crypto = require('crypto');

const generateSecretKey = () => {
  return new Promise((resolve, reject) => {
    const lengthInBytes = 32; // 256 bits
    crypto.randomBytes(lengthInBytes, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString('hex'));
      }
    });
  });
};

(async () => {
  try {
    const secretKey = await generateSecretKey();
    console.log(secretKey);
  } catch (err) {
    console.error('Erreur lors de la génération de la clé secrète:', err);
  }
})();
