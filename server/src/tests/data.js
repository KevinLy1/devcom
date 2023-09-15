const Category = require('../models/Category');

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
    title: 'React'
  });

  Category.create({
    title: 'Front-end'
  });

  Category.create({
    title: 'Back-end'
  });

  Category.create({
    title: 'Autre'
  });
};

createCategories();
console.log('Génération des données terminées');
