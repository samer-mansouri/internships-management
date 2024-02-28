const bcrypt = require('bcrypt');

let hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        return hash;

    } catch (error) {
        throw new Error(error);
    }
}

let comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    hashPassword,
    comparePassword
}

