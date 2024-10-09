const { body, validationResult } = require('express-validator');
const HttpStatus = require('../../helpers/Httpstatus');

exports.createUsermiddleware = [
  body('name')
    .notEmpty()
    .withMessage((value, { req }) => req.t('messages.missing_data_to_fill')),
  
  body('email')
    .notEmpty()
    .withMessage((value, { req }) => req.t('messages.missing_data_to_fill'))
    .isEmail()
    .withMessage((value, { req }) => req.t('messages.The_email_format_is_not_valid')),

  body('username')
    .notEmpty()
    .withMessage((value, { req }) => req.t('messages.missing_data_to_fill')),

  body('password')
    .notEmpty()
    .withMessage((value, { req }) => req.t('messages.missing_data_to_fill')),

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