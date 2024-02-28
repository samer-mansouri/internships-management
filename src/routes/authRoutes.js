const express = require('express');
var router = express.Router();


const {
    signupUser,
    loginUser,
    // logoutUser,
    // handleRefreshAccessToken,
    testIsAdmin,
    // testIsFormer
} = require('../controllers/authController');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');
// const isEncadrant = require('../middlewares/isEncadrant');
// const isEtudiant = require('../middlewares/isEtudiant');

router.post(`/auth/signup`, signupUser);
router.post(`/auth/login`, loginUser);
// router.post(`/auth/logout`, isAuthenticated, logoutUser);
// router.post(`/auth/refresh-access-token`, handleRefreshAccessToken);
router.get(`/auth/test-is-admin`, isAdmin, testIsAdmin);
router.get('/is-authenticated', isAuthenticated, (req, res) => {
    res.status(200).json({ message: 'Authenticated' });
});
// router.get(`/auth/test-is-former`, isFormer, testIsFormer);
// router.get(`/auth/test-is-encadrant`, isEncadrant, testIsEncadrant);




module.exports = router;

