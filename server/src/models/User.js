const EntityRepository = require('../repository/EntityRepository');
const usersTable = 'users';
const joinSkills = 'user_skills';
const joinSocialNetworks = 'user_social_networks';
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

  // ********************************************** CRUD Skills **********************************************
  async addSkill(data) {
    return await EntityRepository.createEntity(joinSkills, data);
  }

  async getSkills(idUser) {
    const resultTable = 'skills';
    const skills = await EntityRepository.getEntities(joinSkills, {
      where: {
        id_user: idUser
      },
      join: true,
      joinConditions: {
        joinType: 'LEFT JOIN',
        table: `${resultTable}`,
        on: `${joinSkills}.id_skill = ${resultTable}.id_skill`
      }
    });

    return skills.length > 0 ? skills : null;
  }

  async checkSkillExistence(idUser, idSkill) {
    const skills = await EntityRepository.getEntities(joinSkills, {
      where: {
        id_user: idUser,
        id_skill: idSkill
      },
      whereOperator: 'AND'
    });

    return skills.length > 0 ? skills[0] : null;
  }

  async removeSkill(idUser, idSkill) {
    return await EntityRepository.deleteEntity({
      id_user: idUser,
      id_skill: idSkill
    });
  }

  // ********************************************** CRUD Social Networks **********************************************
  async addSocialNetwork(data) {
    return await EntityRepository.createEntity(joinSocialNetworks, data);
  }

  async getSocialNetworks(idUser) {
    const resultTable = 'social_networks';
    const socialNetworks = await EntityRepository.getEntities(joinSocialNetworks, {
      where: {
        id_user: idUser
      },
      join: true,
      joinConditions: {
        joinType: 'LEFT JOIN',
        table: `${resultTable}`,
        on: `${joinSocialNetworks}.id_social_network = ${resultTable}.id_social_network`
      }
    });

    return socialNetworks.length > 0 ? socialNetworks : null;
  }

  async checkSocialNetworkExistence(idUser, idSocialNetwork) {
    const socialNetworks = await EntityRepository.getEntities(joinSocialNetworks, {
      where: {
        id_user: idUser,
        id_social_network: idSocialNetwork
      },
      whereOperator: 'AND'
    });

    return socialNetworks.length > 0 ? socialNetworks[0] : null;
  }

  async updateSocialNetwork(idUser, idSocialNetwork, link) {
    return await EntityRepository.updateEntity(joinSocialNetworks, {
      setFields: {
        link: link
      },
      where: {
        id_user: idUser,
        id_social_network: idSocialNetwork
      }
    });
  }

  async removeSocialNetwork(idUser, idSocialNetwork) {
    return await EntityRepository.deleteEntity({
      id_user: idUser,
      id_skill: idSocialNetwork
    });
  }

  // ********************************************** CRUD Favorite Publications **********************************************
  async addFavoritePublication(data) {
    return await EntityRepository.createEntity(joinFavoritePublications, data);
  }

  async getFavoritePublications(idUser) {
    const resultTable = 'publications';
    const publications = await EntityRepository.getEntities(joinFavoritePublications, {
      where: {
        id_user: idUser
      },
      join: true,
      joinConditions: {
        joinType: 'LEFT JOIN',
        table: `${resultTable}`,
        on: `${joinFavoritePublications}.id_publication = ${resultTable}.id_publication`
      }
    });

    return publications.length > 0 ? publications : null;
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
    return await EntityRepository.deleteEntity({
      id_user: idUser,
      id_publication: idPublication
    });
  }
}

module.exports = new User();
