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
      date_last_login: faker.date.past(),
      role: faker.helpers.arrayElement(['administrator', 'moderator', 'user'])
    });
  }

  return console.log('Users created');
};

const createSkills = () => {
  for (let i = 0; i < nbEntities; i++) {
    Skill.create({
      title: faker.word.sample(),
      icon: faker.image.avatarGitHub()
    });
  }

  return console.log('Skills created');
};

const createSocialNetworks = () => {
  for (let i = 0; i < nbEntities; i++) {
    SocialNetwork.create({
      title: faker.word.sample(),
      icon: faker.image.avatarGitHub()
    });
  }

  return console.log('Social networks created');
};

const createPublications = () => {
  for (let i = 0; i < nbEntities; i++) {
    Publication.create({
      type: faker.helpers.arrayElement(['article', 'question']),
      title: faker.lorem.words(5),
      description: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
      image: faker.image.urlPlaceholder(),
      id_user: faker.number.int({ min: 1, max: nbEntities }),
      date_creation: faker.date.past(),
      date_update: faker.date.recent()
    });
  }

  return console.log('Publications created');
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

  return console.log('Comments created');
};

const createChildComments = () => {
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

  return console.log('Child comments created');
};

const createCategories = () => {
  for (let i = 0; i < nbEntities; i++) {
    Category.create({
      title: faker.lorem.word()
    });
  }

  return console.log('Categories created');
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

const createCommentReputation = () => {
  const uniqueIds = new Set();

  while (uniqueIds.size < nbEntities) {
    const idUser = faker.number.int({ min: 1, max: nbEntities });
    const idComment = faker.number.int({ min: 1, max: nbEntities });

    const uniqueId = `${idUser}-${idComment}`;
    if (!uniqueIds.has(uniqueId)) {
      uniqueIds.add(uniqueId);
      Comment.createCommentReputation({
        id_user: idUser,
        id_comment: idComment,
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
createCommentReputation();
createChildComments();
