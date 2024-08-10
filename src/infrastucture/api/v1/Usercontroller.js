const express = require('express');
const BaseController = require('../BaseControlller');
const HttpStatus = require('../../../Utils/helpers/Httpstatus')
const userService = require('../../.././app/services/User/UserService')

class UserController extends BaseController {
    constructor() {
        super();
    }

    async getUser(req, res) {
        try {
            const user = await userService.getAll();
            const message = res.t('messages.user_retrieved_successfully');
            this.success(res, user, message);
        } catch (err) {
            this.error(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createUser(req, res) {
       try {
        await userService.add(req.body)
        const message = res.t('messages.user_created_successfully');
        this.success(res,null,message)
       } catch (err) {
        this.error(res, err, HttpStatus.BAD_REQUEST);
       }
    }
}


module.exports = UserController;