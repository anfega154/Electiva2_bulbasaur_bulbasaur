const { body, validationResult } = require('express-validator');
const HttpStatus = require('../../helpers/Httpstatus');

exports.tweetMiddleware = [
  body('content')
    .notEmpty()
    .withMessage((value, { req }) => req.t('messages.missing_data_to_fill'))
    .isLength({ max: 280 })
    .withMessage((value, { req }) => req.t('messages.content_too_long')), 
  
  body('userid')
    .notEmpty()
    .withMessage((value, { req }) => req.t('messages.missing_data_to_fill')),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: "error",
        message: errors.array().map(err => err.msg).join(', '),
      });
    }
    next();
  }
];