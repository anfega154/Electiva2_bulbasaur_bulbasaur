const { body, validationResult } = require('express-validator');
const HttpStatus = require('../../helpers/Httpstatus');

exports.loginMiddleware = [
  
  body('username')
    .notEmpty()
    .withMessage((value, { req }) => req.t('messages.missing_data_to_fill')),
  
  body('password')
    .notEmpty()
    .withMessage((value, { req }) => req.t('messages.missing_data_to_fill'))
    .isString()
    .withMessage((value, { req }) => req.t('messages.the_password_must_be_a_string')),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: false,
        message: errors.array().map(err => err.msg).join(', '),
      });
    }
    next();
  }
];