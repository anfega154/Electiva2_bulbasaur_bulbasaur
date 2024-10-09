const { body, validationResult } = require('express-validator');
const HttpStatus = require('../../helpers/Httpstatus');

exports.followUserNameMiddleware = [
    body('followerid')
      .isNumeric()
      .withMessage((value, { req }) => req.t('messages.followerid_must_be_numeric'))
      .notEmpty()
      .withMessage((value, { req }) => req.t('messages.missing_data_to_fill'))
      .custom(async (value) => {
        const followerExists = await Follower.findByPk(value); 
        if (!followerExists) {
          throw new Error('Follower ID does not exist');
        }
      }),

    body('usernamefollowingid')
      .isString()
      .withMessage((value, { req }) => req.t('messages.usernamefollowingid_must_be_string'))
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