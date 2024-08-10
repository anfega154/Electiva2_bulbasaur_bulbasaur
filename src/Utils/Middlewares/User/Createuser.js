const { param } = require('express-validator');
const HttpStatus = require('../../helpers/Httpstatus')

exports.createUsermiddleware = (req, res, next) => {
    let params = req.body;
  
    if (!params.name || !params.email || !params.username || !params.password) {
      let message = res.t('messages.missing_data_to_fill')
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: "error",
        message: message,
      });
    }
  
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(params.email)) {
      let message = res.t('messages.The_email_format_is_not_valid')
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: "error",
        message: message,
      });
    }
  
    next();
  };