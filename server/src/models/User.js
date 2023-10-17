const EntityRepository = require('../repository/EntityRepository');
const usersTable = 'users';
const joinFavoritePublications = 'user_favorite_publications';

class User {
  // ********************************************** CRUD Users **********************************************
  async create(data) {
    return await EntityRepository.createEntity(usersTable, data);
  }

  async findAll() {
    const users = await EntityRepository.getEntities(usersTable, {
      excludeFields: ['password']
    });

    return users.length > 0 ? users : null;
  }

  async findById(id) {
    const users = await EntityRepository.getEntities(usersTable, {
      excludeFields: ['password'],
      where: { id_user: id }
    });

    return users.length > 0 ? users[0] : null;
  }

  async findByUsername(username) {
    const users = await EntityRepository.getEntities(usersTable, {
      where: { username: username }
    });

    return users.length > 0 ? users[0] : null;
  }

  async findByEmail(email) {
    const users = await EntityRepository.getEntities(usersTable, {
      where: { email: email }
    });

    return users.length > 0 ? users[0] : null;
  }

  async update(id, data) {
    return await EntityRepository.updateEntity(usersTable, {
      setFields: data,
      where: {
        id_user: id
      }
    });
  }

  async remove(id) {
    return await EntityRepository.deleteEntity(usersTable, {
      id_user: id
    });
  }

  // ********************************************** CRUD Favorite Publications **********************************************
  async addFavoritePublication(data) {
    return await EntityRepository.createEntity(joinFavoritePublications, data);
  }

  async getFavoritePublications(idUser) {
    const favoritesPublications = await EntityRepository.getEntities(joinFavoritePublications, {
      where: {
        id_user: idUser
      }
    });

    return favoritesPublications.length > 0 ? favoritesPublications : null;
  }

  async checkFavoritePublicationExistence(idUser, idPublication) {
    const publications = await EntityRepository.getEntities(joinFavoritePublications, {
      where: {
        id_user: idUser,
        id_publication: idPublication
      },
      whereOperator: 'AND'
    });

    return publications.length > 0 ? publications[0] : null;
  }

  async removeFavoritePublication(idUser, idPublication) {
    return await EntityRepository.deleteEntity(joinFavoritePublications, {
      id_user: idUser,
      id_publication: idPublication
    });
  }
}

module.exports = new User();
