const HttpStatus = require('../../helpers/Httpstatus')

exports.createUsermiddleware = (req, res, next) => {
    let params = req.body;
  
    if (!params.name || !params.email || !params.age) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }
  
    if (isNaN(params.age)) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: "error",
        message: "La edad debe ser un número",
      });
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(params.email)) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: "error",
        message: "El formato del correo electrónico no es válido",
      });
    }
  
    next();
  };