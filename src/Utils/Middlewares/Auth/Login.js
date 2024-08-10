const { param } = require('express-validator');
const HttpStatus = require('../../helpers/Httpstatus')


exports.loginMiddleware = (req, res, next) => {
    let params = req.body;
  
    if (!params.username || !params.password) {
      let message = res.t('messages.missing_data_to_fill')
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: "error",
        message: message,
      });
    }
  
    if (!isNaN(params.password)) {
        let message = res.t('messages.the_password_must_be_a_string')
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: "error",
          message: message,
        });
      }
    next();
  };