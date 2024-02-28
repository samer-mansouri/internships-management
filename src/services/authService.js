const { getRepository } = require("typeorm");
const User = require("../models/User"); // Make sure to adjust this path to your User entity schema

let createUser = async (data) => {
    try {
        const userRepository = getRepository(User);
        let user = userRepository.create(data);
        return await userRepository.save(user);
    } catch (error) {
        throw new Error(error);
    }
}

let getUser = async (email) => {
    try {
        const userRepository = getRepository(User);
        return await userRepository.findOne({ where: { email } });
    } catch (error) {
        throw new Error(error);
    }
}

let getUserWithEmailAndPassword = async (email, password) => {
    try {
        const userRepository = getRepository(User);
        return await userRepository.findOne({
            where: {
                email,
                password // Note: Storing plaintext passwords is insecure. Consider using bcrypt to hash passwords.
            }
        });
    }
    catch (error) {
        throw new Error(error);
    }
}

// let saveUserRefreshToken = async (_id, refreshToken) => {
//     try {
//         const userRepository = getRepository(User);
//         return await userRepository.save({
//             id: _id,
//             refreshToken
//         });
//     }
//     catch (error) {
//         throw new Error(error);
//     }
// }

let getUserWithIdAndRefreshToken = async (_id, refreshToken) => {
    try {
        const userRepository = getRepository(User);
        return await userRepository.findOne({ 
            where: { 
                id: _id, 
                refreshToken 
            } 
        });
    }
    catch (error) {
        throw new Error(error);
    }
}

let checkForUserRefreshTokenAndRemoveIt = async (userId, refreshToken) => {
    try {
        const userRepository = getRepository(User);
        let user = await userRepository.findOne({ 
            where: { 
                id: userId, 
                refreshToken 
            } 
        });
        
        if (user) {
            user.refreshToken = null; // Remove refreshToken
            return await userRepository.save(user);
        }
    }
    catch (error) {
        throw new Error(error);
    }
}

let checkUserRole = async (userId, role) => {
    try {
        const userRepository = getRepository(User);
        const userFound = await userRepository.findOne({ 
            where: { 
                id: userId, 
                role 
            } 
        });

        if (userFound) {
            return true;
        }
        return false;
    }
    catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    createUser,
    getUser,
    getUserWithEmailAndPassword, 
    // saveUserRefreshToken,
    checkForUserRefreshTokenAndRemoveIt,
    getUserWithIdAndRefreshToken,
    checkUserRole
}
