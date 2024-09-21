const RepositoryBase = require('../../../Data/Repository');
const User = require('../../User/Models/User');
const { Op } = require('sequelize');

class AuthRepository extends RepositoryBase {
    constructor() {
      super(User);
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