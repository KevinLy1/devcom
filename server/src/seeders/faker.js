const { faker } = require('@faker-js/faker/locale/fr');
const User = require('../models/User');
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
      // avatar: faker.internet.avatar(),
      biography: faker.lorem.paragraph(),
      skills: faker.lorem.words(4),
      web_url: faker.internet.url(),
      date_registration: faker.date.past(),
      role: faker.helpers.arrayElement(['administrator', 'user'])
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
      // image: faker.image.urlPlaceholder(),
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

const createCategories = () => {
  Category.create({
    title: 'HTML'
  });
  Category.create({
    title: 'CSS'
  });
  Category.create({
    title: 'JavaScript'
  });
  Category.create({
    title: 'PHP'
  });
  Category.create({
    title: 'SQL'
  });
  Category.create({
    title: 'React'
  });
  Category.create({
    title: 'Node.js'
  });
  Category.create({
    title: 'Autre'
  });
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
    const idCategory = faker.number.int({ min: 1, max: 8 });
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
createPublications();
createComments();
createCategories();
createUserFavoritePublications();
createPublicationCategories();
createPublicationReputation();
createCommentReplies();
console.log('Génération des données terminées');
