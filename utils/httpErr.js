
const customError = function (status, message) {

    return {
        error: true,
        statusCode: status,
        message: message
    }

}

module.exports = customError;