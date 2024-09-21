const RepositoryBase = require('../../../infrastucture/database/Repository');
const User = require('../Models/User');
const Follower = require('../../Follow/Models/Follower');
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
      if (!user) throw new Error('User Not Found');
      await user.update(data);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const user = await this.model.findByPk(id);
      if (!user) throw new Error('User Not Found');
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
      console.error('Error finding user:', error);
      throw error;
    }
  }

  async followUser(followerid, followingid) {
    try {
      const follower = await this.getById(followerid);
      const following = await this.getById(followingid);
      if (follower && following) {
        await Follower.findOrCreate({
          where: { followerid, followingid },
        });
      }
    } catch (err) {
      console.error('Error in followUser:', err);
      throw err;
    }
  }

  async getFollowers(userId, page, limit) {
    const offset = (page - 1) * limit;
    return await Follower.findAll({
        where: { followingid: userId },
        include: [{ model: User, as: 'follower' }],
        limit: parseInt(limit),
        offset: parseInt(offset),
    });
}

  async getFollowing(userId, page, limit) {
    const offset = (page - 1) * limit;
    return await Follower.findAll({
      where: { followerid: userId },
      include: [{ model: User, as: 'following' }],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  }

  async getFollowerCount(userId) {
    return await Follower.count({ where: { followingid: userId } });
  }

  async getFollowingCount(userId) {
    return await Follower.count({ where: { followerid: userId } });
  }

  async findByUsername(username) {
    try {
      return await this.model.findOne({
        where: {
          username
        }
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;