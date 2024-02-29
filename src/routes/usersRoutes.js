const express = require('express');
var router = express.Router();

const {
    getUsers ,
    removeUser,
    editUser
} = require('../controllers/usersController');


router.get(`/users`, getUsers);
router.delete(`/users/:id`, removeUser);
router.put(`/users/:id`, editUser);

module.exports = router;