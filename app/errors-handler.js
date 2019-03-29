function getErrorMessage(err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err);
                break;
            default:
                message = err.message ? err.message : err;
        }
    } else if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message += err.errors[errName].message + ' ';
        }
    }
    else if (err.message) {
        message = err.message;
    } else {
        message = err;
    }

    return message;
}

exports.getErrorMessage = getErrorMessage;
