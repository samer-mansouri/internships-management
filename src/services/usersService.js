const { getRepository } = require("typeorm");
const User = require("../models/User"); // Make sure to adjust this path to your User entity schema
const Intern = require('../models/Intern');
const Encadrant = require('../models/Encadrant');


let getUsersList = async () => {
    try {
        const userRepository = getRepository(User);
        const users = await userRepository.find({
            select: ['id', 'firstName', 'lastName', 'address', 'email', 'gender', 'role', 'relatedRoleId']
        });

        const roleRepositoryMap = {
            intern: getRepository(Intern),
            encadrant: getRepository(Encadrant),
        };

        // Enrich each user with their related role
        const usersWithRelatedRoles = await Promise.all(users.map(async (user) => {
            const roleRepository = roleRepositoryMap[user.role];
            if (roleRepository) {
                const relatedRole = await roleRepository.findOne({
                    where: { id: user.relatedRoleId }
                });
                delete user.relatedRoleId;
                user.relatedRole = relatedRole || null; // Attach the related role or null if not found
            } else {
                delete user.relatedRoleId;
            }
            return user;
        }));

        return usersWithRelatedRoles;
    } catch (error) {
        throw new Error(error);
    }
};


let deleteUser = async (userId) => {
    try {
        const userRepository = getRepository(User);



        const user = await userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new Error('User not found');
        }

        //first delete its related role
        const roleRepositoryMap = {
            intern: getRepository(Intern),
            encadrant: getRepository(Encadrant),
        };

        const roleRepository = roleRepositoryMap[user.role];
        if (roleRepository) {
            await roleRepository.delete({ user: userId });
        }


       

        await userRepository.delete(userId);

        return true;
    } catch (error) {
        throw new Error(error);
    }
};


let updateUser = async (userId, userData) => {
    try {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new Error('User not found');
        }

        const updatedUser = await userRepository.save({
            ...user,
            ...userData
        });

        delete updatedUser.password; // Ensure password is not returned

        return updatedUser;
    } catch (error) {
        throw new Error(error);
    }
};




module.exports = {
    getUsersList,
    deleteUser,
    updateUser
};