const EntityRepository = require('../repository/EntityRepository');
const categoriesTable = 'categories';
const joinPublications = 'publication_categories';

class Category {
  async create(data) {
    return await EntityRepository.createEntity(categoriesTable, data);
  }

  async findAll() {
    const categories = await EntityRepository.getEntities(categoriesTable);
    return categories.length > 0 ? categories : null;
  }

  async findById(id) {
    const categories = await EntityRepository.getEntities(categoriesTable, {
      where: { id_category: id }
    });

    return categories.length > 0 ? categories[0] : null;
  }

  async findByTitle(title) {
    const categories = await EntityRepository.getEntities(categoriesTable, {
      where: { title: title }
    });

    return categories.length > 0 ? categories[0] : null;
  }

  async update(id, data) {
    return await EntityRepository.updateEntity(categoriesTable, {
      setFields: data,
      where: {
        id_category: id
      }
    });
  }

  async remove(id) {
    return await EntityRepository.deleteEntity(categoriesTable, {
      id_category: id
    });
  }

  async getPublications(id) {
    return await EntityRepository.getEntities(joinPublications, {
      where: {
        id_category: id
      }
    });
  }
}

module.exports = new Category();
