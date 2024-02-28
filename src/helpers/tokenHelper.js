const jwt = require('jsonwebtoken');

const destructUser = (user) => {
    return {
        "UserInfo": {
            "email": user.email,
            "_id": user._id,
            "role": user.role
        }
    }
}

const generateAccessToken = (user) => {
    return jwt.sign(destructUser(user), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7D' });
}

// const generateRefreshToken = (user) => {
//     return jwt.sign(destructUser(user), process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
// }

const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
}

//function to check if token has really expired
const isTokenExpired = (token) => {
    const decoded = jwt.decode(token);
    return decoded.exp < Date.now() / 1000;
}


module.exports = {
    generateAccessToken,
    verifyToken,
    isTokenExpired
}