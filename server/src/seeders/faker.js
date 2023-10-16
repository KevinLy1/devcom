const { faker } = require('@faker-js/faker/locale/fr');
const User = require('../models/User');
const Skill = require('../models/Skill');
const SocialNetwork = require('../models/SocialNetwork');
const Publication = require('../models/Publication');
const Comment = require('../models/Comment');
const Category = require('../models/Category');

const nbEntities = 50;

const createUsers = () => {
  for (let i = 0; i < nbEntities; i++) {
    User.create({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      gender: faker.helpers.arrayElement(['M', 'F', 'O']),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      avatar: faker.internet.avatar(),
      biography: faker.lorem.paragraph(),
      web_url: faker.internet.url(),
      date_registration: faker.date.past(),
      role: faker.helpers.arrayElement(['administrator', 'user'])
    });
  }
};

const createSkills = () => {
  for (let i = 0; i < nbEntities; i++) {
    Skill.create({
      title: faker.word.sample()
    });
  }
};

const createSocialNetworks = () => {
  for (let i = 0; i < nbEntities; i++) {
    SocialNetwork.create({
      title: faker.word.sample()
    });
  }
};

const createPublications = () => {
  for (let i = 0; i < nbEntities; i++) {
    Publication.create({
      type: faker.helpers.arrayElement(['article', 'discussion']),
      title: faker.lorem.words(5),
      description: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
      image: faker.image.urlPlaceholder(),
      id_user: faker.number.int({ min: 1, max: nbEntities }),
      date_creation: faker.date.past(),
      date_update: faker.date.recent()
    });
  }
};

const createComments = () => {
  for (let i = 0; i < nbEntities; i++) {
    Comment.create({
      date_creation: faker.date.past(),
      date_update: faker.date.recent(),
      id_publication: faker.number.int({ min: 1, max: nbEntities }),
      id_user: faker.number.int({ min: 1, max: nbEntities }),
      content: faker.lorem.sentence()
    });
  }
};

const createCommentReplies = () => {
  for (let i = 0; i < nbEntities; i++) {
    Comment.create({
      date_creation: faker.date.past(),
      date_update: faker.date.recent(),
      id_publication: faker.number.int({ min: 1, max: nbEntities }),
      id_user: faker.number.int({ min: 1, max: nbEntities }),
      content: faker.lorem.sentence(),
      parent_comment: faker.number.int({ min: 1, max: nbEntities })
    });
  }
};

// const createComments = async () => {
//   for (let i = 0; i < nbEntities; i++) {
//     const idPublication = faker.number.int({ min: 1, max: nbEntities });

//     // Créez le commentaire principal et récupérez son insertId
//     const parentCommentResult = await Comment.create({
//       date_creation: faker.date.past(),
//       date_update: faker.date.recent(),
//       id_publication: idPublication,
//       id_user: faker.number.int({ min: 1, max: nbEntities }),
//       content: faker.lorem.sentence()
//     });

//     const parentCommentId = parentCommentResult.insertId;

//     // Créez trois commentaires enfants pour chaque commentaire principal
//     for (let j = 0; j < 3; j++) {
//       await Comment.create({
//         date_creation: faker.date.past(),
//         date_update: faker.date.recent(),
//         id_publication: idPublication,
//         id_user: faker.number.int({ min: 1, max: nbEntities }),
//         content: faker.lorem.sentence(),
//         parent_comment: parentCommentId // Utilisez l'insertId du commentaire principal comme parent
//       });
//     }
//   }
// };

const createCategories = () => {
  for (let i = 0; i < nbEntities; i++) {
    Category.create({
      title: faker.lorem.word()
    });
  }
};

const createUserSocialNetworks = () => {
  const uniqueIds = new Set();

  while (uniqueIds.size < nbEntities) {
    const idUser = faker.number.int({ min: 1, max: nbEntities });
    const idSocialNetwork = faker.number.int({ min: 1, max: nbEntities });

    const uniqueId = `${idUser}-${idSocialNetwork}`;
    if (!uniqueIds.has(uniqueId)) {
      uniqueIds.add(uniqueId);
      User.addSocialNetwork({
        id_user: idUser,
        id_social_network: idSocialNetwork,
        link: faker.internet.url()
      });
    }
  }
};

const createUserSkills = () => {
  const uniqueIds = new Set();

  while (uniqueIds.size < nbEntities) {
    const idUser = faker.number.int({ min: 1, max: nbEntities });
    const idSkill = faker.number.int({ min: 1, max: nbEntities });

    const uniqueId = `${idUser}-${idSkill}`;
    if (!uniqueIds.has(uniqueId)) {
      uniqueIds.add(uniqueId);
      User.addSkill({
        id_user: idUser,
        id_skill: idSkill
      });
    }
  }
};

const createUserFavoritePublications = () => {
  const uniqueIds = new Set();

  while (uniqueIds.size < nbEntities) {
    const idUser = faker.number.int({ min: 1, max: nbEntities });
    const idPublication = faker.number.int({ min: 1, max: nbEntities });

    const uniqueId = `${idUser}-${idPublication}`;
    if (!uniqueIds.has(uniqueId)) {
      uniqueIds.add(uniqueId);
      User.addFavoritePublication({
        id_user: idUser,
        id_publication: idPublication
      });
    }
  }
};

const createPublicationCategories = () => {
  const uniqueIds = new Set();

  while (uniqueIds.size < nbEntities) {
    const idCategory = faker.number.int({ min: 1, max: nbEntities });
    const idPublication = faker.number.int({ min: 1, max: nbEntities });

    const uniqueId = `${idCategory}-${idPublication}`;
    if (!uniqueIds.has(uniqueId)) {
      uniqueIds.add(uniqueId);
      Publication.addCategory({
        id_category: idCategory,
        id_publication: idPublication
      });
    }
  }
};

const createPublicationReputation = () => {
  const uniqueIds = new Set();

  while (uniqueIds.size < nbEntities) {
    const idUser = faker.number.int({ min: 1, max: nbEntities });
    const idPublication = faker.number.int({ min: 1, max: nbEntities });

    const uniqueId = `${idUser}-${idPublication}`;
    if (!uniqueIds.has(uniqueId)) {
      uniqueIds.add(uniqueId);
      Publication.createPublicationReputation({
        id_user: idUser,
        id_publication: idPublication,
        reputation_value: faker.helpers.arrayElement([1, -1])
      });
    }
  }
};

// Appeler les fonctions pour créer les entrées dans chaque table
createUsers();
createSkills();
createSocialNetworks();
createPublications();
createComments();
createCategories();
createUserSocialNetworks();
createUserSkills();
createUserFavoritePublications();
createPublicationCategories();
createPublicationReputation();
createCommentReplies();
console.log('Génération des données terminées');
