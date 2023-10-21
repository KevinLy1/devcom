const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

class ImageController {
  uploadImage(req, res) {
    try {
      const imageName = req.file.filename;
      res.status(201).send({ imageName });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async deleteImage(req, res) {
    try {
      const imageName = req.params.imageName;
      fs.unlink(path.join(__dirname, '../../uploads/', imageName), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Erreur de serveur interne' });
        } else {
          res.json({ message: 'Image supprimée avec succès' });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }
}

module.exports = { ImageController: new ImageController(), upload };
