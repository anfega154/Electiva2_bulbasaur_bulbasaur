const RepositoryBase = require('../../Data/Repository');
const User = require('../../domain/Models/User');
const { Op } = require('sequelize');

class UserRepository extends RepositoryBase {
  constructor() {
    super(User);
  }

  async getAll() {
    try {
      return await this.model.findAll();
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      return await this.model.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const user = await this.model.findByPk(id);
      if (!user) throw new Error('Usuario no encontrado');
      await user.update(data);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const user = await this.model.findByPk(id);
      if (!user) throw new Error('Usuario no encontrado');
      await user.destroy();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async exist(email, username) {
    try {
      return await this.model.findOne({
        where: {
          [Op.or]: [
            { email },
            { username }
          ]
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async login(username, password) {
    try {
      return await this.model.findOne({
        where: {
          [Op.and]: [
            { username },
            { password }
          ]
        }
      });
    } catch (err) {
      throw err;
    }
  }
}
module.exports = UserRepository;