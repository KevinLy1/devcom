const EntityRepository = require('../repository/EntityRepository');
const commentsTable = 'comments';

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
      id_comment: id
    });
  }

  async getReplies(id) {
    const replies = await EntityRepository.getEntities(commentsTable, {
      where: {
        parent_comment: id
      }
    });

    return replies.length > 0 ? replies : null;
  }
}

module.exports = new Comment();
