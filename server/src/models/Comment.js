const EntityRepository = require('../repository/EntityRepository');
const commentsTable = 'comments';
const joinCommentReputations = 'comment_reputations';

class Comment {
  async create(data) {
    return await EntityRepository.createEntity(commentsTable, data);
  }

  async findAll() {
    const comments = await EntityRepository.getEntities(commentsTable);
    return comments.length > 0 ? comments : null;
  }

  async findById(id) {
    const comments = await EntityRepository.getEntities(commentsTable, {
      where: { id_comment: id }
    });

    return comments.length > 0 ? comments[0] : null;
  }

  async update(id, data) {
    return await EntityRepository.updateEntity(commentsTable, {
      setFields: data,
      where: {
        id_comment: id
      }
    });
  }

  async remove(id) {
    return await EntityRepository.deleteEntity(commentsTable, {
      where: {
        id_comment: id
      }
    });
  }

  // ********************************************** CRUD Comment Reputation **********************************************

  async createCommentReputation(data) {
    return await EntityRepository.createEntity(joinCommentReputations, data);
  }

  async checkReputation(idUser, idComment) {
    const reputations = await EntityRepository.getEntities(joinCommentReputations, {
      includeFields: ['reputaton_value'],
      where: {
        id_user: idUser,
        id_comment: idComment
      }
    });

    return reputations.length > 0 ? reputations[0] : null;
  }

  async getTotalReputation(idComment) {
    const total = await EntityRepository.getEntities(joinCommentReputations, {
      where: {
        id_comment: idComment
      }
    });

    return total.length > 0 ? total.length : null;
  }

  async updateCommentReputation(idUser, idComment, data) {
    return await EntityRepository.updateEntity(joinCommentReputations, {
      setFields: {
        reputation_value: data
      },
      where: {
        id_user: idUser,
        id_comment: idComment
      }
    });
  }
  async deleteCommentReputation(idUser, idComment) {
    return await EntityRepository.deleteEntity(joinCommentReputations, {
      where: {
        id_user: idUser,
        id_comment: idComment
      }
    });
  }
}

module.exports = new Comment();
