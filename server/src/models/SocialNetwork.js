const EntityRepository = require('../repository/EntityRepository');
const socialNetworkTable = 'social_networks';

class SocialNetwork {
  async create(data) {
    return await EntityRepository.createEntity(socialNetworkTable, data);
  }

  async findAll() {
    const socialNetworks = await EntityRepository.getEntities(socialNetworkTable);
    return socialNetworks.length > 0 ? socialNetworks : null;
  }

  async findById(id) {
    const socialNetworks = await EntityRepository.getEntities(socialNetworkTable, {
      where: { id_skill: id }
    });

    return socialNetworks.length > 0 ? socialNetworks[0] : null;
  }

  async findByTitle(title) {
    const socialNetworks = await EntityRepository.getEntities(socialNetworkTable, {
      where: { title: title }
    });

    return socialNetworks.length > 0 ? socialNetworks[0] : null;
  }

  async update(id, data) {
    return await EntityRepository.updateEntity(socialNetworkTable, {
      setFields: data,
      where: {
        id_social_network: id
      }
    });
  }

  async remove(id) {
    return await EntityRepository.deleteEntity(socialNetworkTable, {
      where: {
        id_social_network: id
      }
    });
  }
}

module.exports = new SocialNetwork();
