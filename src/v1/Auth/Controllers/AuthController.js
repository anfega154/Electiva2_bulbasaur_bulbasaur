const BaseController = require('../../../infrastucture/api/BaseControlller');
const HttpStatus = require('../../../Utils/helpers/Httpstatus')
const AuthrService = require('../../Auth/Services/AuthService')
const jwt = require('jsonwebtoken');


class AuthController extends BaseController {
    constructor() {
        super();
    }

    async login(req, res) {
        try {
            const user = await AuthrService.login(req.body)
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            console.log(token)
            const message = res.t('messages.login_success')
            this.success(res, { token }, message);
        } catch (error) {
            this.error(res, error, HttpStatus.BAD_REQUEST);
        }
    }

}

module.exports = AuthController;
