const EntityRepository = require('../repository/EntityRepository');
const skillsTable = 'skills';

class Skill {
  async create(data) {
    return await EntityRepository.createEntity(skillsTable, data);
  }

  async findAll() {
    const skills = await EntityRepository.getEntities(skillsTable);
    return skills.length > 0 ? skills : null;
  }

  async findById(id) {
    const skills = await EntityRepository.getEntities(skillsTable, {
      where: { id_skill: id }
    });

    return skills.length > 0 ? skills[0] : null;
  }

  async findByTitle(title) {
    const skills = await EntityRepository.getEntities(skillsTable, {
      where: { title: title }
    });

    return skills.length > 0 ? skills[0] : null;
  }

  async update(id, data) {
    return await EntityRepository.updateEntity(skillsTable, {
      setFields: data,
      where: {
        id_skill: id
      }
    });
  }

  async remove(id) {
    return await EntityRepository.deleteEntity(skillsTable, {
      where: {
        id_skill: id
      }
    });
  }
}

module.exports = new Skill();
