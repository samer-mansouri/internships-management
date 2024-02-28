const { sendResponse } = require('../helpers/responseHelper');
const { verifyToken } = require('../helpers/tokenHelper');

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader) {
        return sendResponse(res, 401, false, 'Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    try {
        const user = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user.UserInfo;
        next();
    }
    catch (error) {
        return sendResponse(res, 401, false, 'Unauthorized');
    }
}

module.exports = isAuthenticated;
