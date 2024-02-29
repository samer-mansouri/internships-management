const { getRepository } = require("typeorm");
const User = require("../models/User"); // Make sure to adjust this path to your User entity schema
const Intern = require('../models/Intern');
const Encadrant = require('../models/Encadrant');

let createUser = async (data) => {
    try {
        const userRepository = getRepository(User);
        let user = userRepository.create(data);
        return await userRepository.save(user);
    } catch (error) {
        throw new Error(error);
    }
}

let createIntern = async (data) => {
    try {
        const internRepository = getRepository(Intern);
        let intern = internRepository.create(data);
        return await internRepository.save(intern);
    } catch (error) {
        throw new Error(error);
    }
}

let createEncadrant = async (data) => {
    try {
        const encadrantRepository = getRepository(Encadrant);
        let encadrant = encadrantRepository.create(data);
        return await encadrantRepository.save(encadrant);
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

let updateUserRelatedRoleId = async (userId, relatedRoleId) => {

    try {
        const userRepository = getRepository(User);
        
        const userFound = await userRepository.findOne({ 
            where: { 
                id: userId
            } 
        });

        if (userFound) {
            userFound.relatedRoleId = relatedRoleId;
            return await userRepository.save(userFound);
        }

        return false;

    } catch(error){
        throw new Error(error);
    }

}


let returnUserWithItsRelatedRole = async (userId, role) => {
    try {
        const userRepository = getRepository(User);
        const userFound = await userRepository.findOne({ where: { id: userId, role } });

        if (!userFound) {
            throw new Error('User not found');
        }

        const roleRepositoryMap = {
            intern: getRepository(Intern),
            encadrant: getRepository(Encadrant)
        };

        const roleRepository = roleRepositoryMap[userFound.role];

        if (roleRepository) {
            const relatedRole = await roleRepository.findOne({
                where: { id: userFound.relatedRoleId }
            });

            delete userFound.relatedRoleId;
            userFound.relatedRole = relatedRole;
        } else {
            delete userFound.relatedRoleId;
        }

        return userFound;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    createUser,
    getUser,
    getUserWithEmailAndPassword, 
    // saveUserRefreshToken,
    checkForUserRefreshTokenAndRemoveIt,
    getUserWithIdAndRefreshToken,
    checkUserRole,
    createIntern,
    createEncadrant,
    updateUserRelatedRoleId,
    returnUserWithItsRelatedRole
}
