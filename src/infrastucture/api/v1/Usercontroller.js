const express = require('express');
const BulbasaurController = require('../BulbasaurControlller');
const HttpStatus = require('../../../Utils/helpers/Httpstatus')

class UserController extends BulbasaurController {
    constructor() {
        super();
    }

    getUser(req, res) {
        const user = { id: 1, name: 'John Doe' }; 
        const message = res.t('messages.user_retrieved_successfully');
        this.success(res, user, message);
    }

    createUser(req, res) {
        const error = res.t('messages.user_creation_failed');
        this.error(res, error, HttpStatus.BAD_REQUEST);
    }
}


module.exports = UserController;