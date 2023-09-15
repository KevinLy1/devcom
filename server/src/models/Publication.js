const EntityRepository = require('../repository/EntityRepository');
const publicationsTable = 'publications';
const commentsTable = 'comments';
const joinCategories = 'publication_categories';
const joinPublicationReputations = 'publication_reputations';

class Publication {
  // ********************************************** Publications **********************************************
  async create(data) {
    return await EntityRepository.createEntity(publicationsTable, data);
  }

  async findAll() {
    const publications = await EntityRepository.getEntities(publicationsTable);
    return publications.length > 0 ? publications : null;
  }

  async findLatestArticles() {
    const publications = await EntityRepository.executeQueryWithValues(
      `SELECT * FROM ${publicationsTable} WHERE type = 'article' ORDER BY date_creation DESC LIMIT 6`
    );
    return publications.length > 0 ? publications : null;
  }

  async findLatestDiscussions() {
    const publications = await EntityRepository.executeQueryWithValues(
      `SELECT * FROM ${publicationsTable} WHERE type = 'discussion' ORDER BY date_creation DESC LIMIT 6`
    );
    return publications.length > 0 ? publications : null;
  }

  async findById(id) {
    const publications = await EntityRepository.getEntities(publicationsTable, {
      where: {
        id_publication: id
      }
    });

    return publications.length > 0 ? publications[0] : null;
  }

  async update(id, data) {
    return await EntityRepository.updateEntity(publicationsTable, {
      setFields: data,
      where: {
        id_publication: id
      }
    });
  }

  async remove(id) {
    return await EntityRepository.deleteEntity(publicationsTable, {
      id_publication: id
    });
  }

  // ********************************************** CRUD Publication Categories **********************************************
  async addCategory(data) {
    return await EntityRepository.createEntity(joinCategories, data);
  }

  async getCategories(idPublication) {
    const resultTable = 'categories';
    const categories = await EntityRepository.getEntities(joinCategories, {
      where: {
        id_publication: idPublication
      },
      join: true,
      joinConditions: {
        joinType: 'LEFT JOIN',
        table: `${resultTable}`,
        on: `${joinCategories}.id_category = ${resultTable}.id_category`
      }
    });

    return categories.length > 0 ? categories : null;
  }

  async checkCategoryExistence(idPublication, idCategory) {
    const categories = await EntityRepository.getEntities(joinCategories, {
      where: {
        id_publication: idPublication,
        id_category: idCategory
      },
      whereOperator: 'AND'
    });

    return categories.length > 0 ? categories[0] : null;
  }

  async removeCategory(idPublication, idCategory) {
    return await EntityRepository.deleteEntity({
      id_publication: idPublication,
      id_category: idCategory
    });
  }

  // ********************************************** CRUD Publication Reputation **********************************************

  async createPublicationReputation(data) {
    return await EntityRepository.createEntity(joinPublicationReputations, data);
  }

  async checkReputation(idUser, idPublication) {
    const reputations = await EntityRepository.getEntities(joinPublicationReputations, {
      includeFields: ['reputation_value'],
      where: {
        id_user: idUser,
        id_publication: idPublication
      }
    });

    return reputations.length > 0 ? reputations[0] : null;
  }

  async getTotalReputation(idPublication) {
    const total = await EntityRepository.getEntities(joinPublicationReputations, {
      where: {
        id_publication: idPublication
      }
    });

    return total.length > 0 ? total : null;
  }

  async updatePublicationReputation(idUser, idPublication, data) {
    return await EntityRepository.updateEntity(joinPublicationReputations, {
      setFields: {
        reputation_value: data
      },
      where: {
        id_user: idUser,
        id_publication: idPublication
      }
    });
  }
  async deletePublicationReputation(idUser, idPublication) {
    return await EntityRepository.deleteEntity(joinPublicationReputations, {
      id_user: idUser,
      id_publication: idPublication
    });
  }

  // ********************************************** Publication comments **********************************************

  async getComments(id) {
    return await EntityRepository.getEntities(commentsTable, {
      where: {
        id_publication: id
      }
    });
  }
}

module.exports = new Publication();
