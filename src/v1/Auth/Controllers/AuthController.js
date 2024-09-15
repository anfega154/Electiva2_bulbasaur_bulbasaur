const BaseController = require('../../../infrastucture/api/BaseControlller');
const HttpStatus = require('../../../Utils/helpers/Httpstatus')
const AuthrService = require('../../Auth/Services/AuthService')

class AuthController extends BaseController {
    constructor() {
        super();
    }

    async login (req, res) {
        try {
            await AuthrService.login(req.body)
            const message = res.t('messages.login_success')
            this.success(res,null,message)
        } catch (error) {
            this.error(res, err, HttpStatus.BAD_REQUEST);
        }
    }

}

module.exports = AuthController;
