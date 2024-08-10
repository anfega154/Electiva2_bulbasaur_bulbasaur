const HttpStatus = require("../../Utils/helpers/Httpstatus");
class BulbasaurController {

    success(res, body, message = "") {
        return res.status(HttpStatus.OK).json({
            success: true,
            message: message,
            body: body
        });
    }

    created(res, body, message = "") {
        return res.status(HttpStatus.CREATED).json({
            success: true,
            message: message || null,
            body: body
        });
    }

    accepted(res, body, message = "") {
        return res.status(HttpStatus.ACCEPTED).json({
            success: true,
            message: message || null,
            body: body
        });
    }

    error(res, message, status = 400) {
        return res.status(status).json({
            success: false,
            message: message
        });
    }

}

module.exports = BulbasaurController;