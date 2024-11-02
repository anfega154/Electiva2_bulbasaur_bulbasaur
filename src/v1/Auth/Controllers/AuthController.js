const BaseController = require('../../../infrastucture/api/BaseControlller');
const HttpStatus = require('../../../Utils/helpers/Httpstatus')
const AuthrService = require('../../Auth/Services/AuthService')
const { addToBlacklist } = require('../../../Utils/Middlewares/Auth/Logout');
const {getToken} = require('../../../Utils/Middlewares/Auth/TokenMiddleware')
const jwt = require('jsonwebtoken');


class AuthController extends BaseController {
    constructor() {
        super();
    }

    async login(req, res) {
        try {
            const user = await AuthrService.login(req.body)
            const token = jwt.sign(
                { id: user.id, email: user.email, username: user.username, avatarurl: user.avatarurl, name: user.name },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );
            const message = res.t('messages.login_success')
            this.success(res, { token }, message);
        } catch (error) {
            this.error(res, error, HttpStatus.BAD_REQUEST);
        }
    }

    async logout(req, res) {
        try {
            await addToBlacklist(getToken(req));
            const message = res.t('messages.logout_success');
            this.success(res, {}, message);
        } catch (error) {
            console.log(error)
            this.error(res, error, HttpStatus.BAD_REQUEST);
        }
    }

}

module.exports = AuthController;
