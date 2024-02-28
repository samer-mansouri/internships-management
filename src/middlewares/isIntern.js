const { sendResponse } = require('../helpers/responseHelper');
const { verifyToken } = require('../helpers/tokenHelper');
const { checkUserRole } = require('../services/authService');

const isIntern = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader) {
        return sendResponse(res, 401, false, 'Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    try {
        const user = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
        const isUserAdmin = await checkUserRole(user.UserInfo._id, 'encadrant');
        if (isUserAdmin && user.UserInfo.role === "encadrant") {
            req.user = user.UserInfo;
            next();
        }
        else {
            return sendResponse(res, 401, false, 'Unauthorized');
        }
    }
    catch (error) {
        return sendResponse(res, 401, false, 'Unauthorized');
    }
}

module.exports = isIntern;