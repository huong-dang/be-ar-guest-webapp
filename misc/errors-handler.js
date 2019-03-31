'use strict';

/**
 * Get unique error field name
 */
var getUniqueErrorMessage = function(err) {
    var output;

    try {
        var fieldName = err.err.substring(err.err.lastIndexOf('.$') + 2, err.err.lastIndexOf('_1'));
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';

    } catch (ex) {
        output = 'Unique field already exists';
    }

    return output;
};

/**
 * Get the error message from error object
 */
exports.getErrorMessage = function(err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err);
                break;
            default:
                message = err.message ? err.message : err.sqlMessage ? err.sqlMessage : err;
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
};

/**
 * Log the error. Papertrail catches errType and slack the errMessage.
 */
exports.logError= function(errType, errMessage) {
    console.error(errType + ': ' + errMessage);
};

// Log fair related error. It will prints user's name, email, fair name, and link to fair.
exports.logFairError = function(title, user, fair, httpHeader, err) {
    var errString = '';
    // Print user information
    if (user && user.displayName) {
        errString += 'User name: ' + user.displayName;

        if (user && user.primary_organization && typeof user.primary_organization === 'object') {
            errString += ' (' + user.primary_organization.name + ')';
        }
        errString += ', email: ' + user.email;
        errString += ' | ';
    }

    // Print fair information
    if (fair && fair.name) {
        errString += 'Fair: ' + fair.name;
        if (fair.fair_group && fair.fair_group.primary_organization && typeof fair.fair_group.primary_organization === 'object') {
            errString += ' (' + (fair.fair_group.primary_organization.name ? fair.fair_group.primary_organization.name : 'No Primary Organization') + '), ';
            errString += 'link to fair: ' + httpHeader + '/#!/fairs/' + fair.id;
        }
        errString += ' | ';
    }

    errString += 'Server Response - ' + err;

    console.error(title + ': ' + errString);
};

exports.returnMongooseErrorResponse = function(err, res) {
    res.status(400).send({
                             message: this.getErrorMessage(err)
                         });
};
