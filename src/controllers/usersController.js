const { sendResponse } = require('../helpers/responseHelper');

const { getUsersList, deleteUser, updateUser } = require('../services/usersService');

const getUsers = async (req, res) => {
    try {
        const users = await getUsersList();
        return sendResponse(res, 200, true, 'Users retrieved successfully', users);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const removeUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const userDeleted = await deleteUser(userId);
        if (userDeleted) {
            return sendResponse(res, 200, true, 'User deleted successfully');
        }
        return sendResponse(res, 404, false, 'User not found');
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const editUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;

        //if the request include password, remove it from the data
        if (userData.password) {
            delete userData.password;
        }

        const updatedUser = await updateUser(userId, userData);
        return sendResponse(res, 200, true, 'User updated successfully', updatedUser);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

module.exports = {
    getUsers,
    removeUser,
    editUser
};
