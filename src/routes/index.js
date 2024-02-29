const express = require('express');
const router = express.Router();


const apiVersion = '/api/v1';

const authRoutes = require('./authRoutes');
const usersRoutes = require('./usersRoutes');

router.use(`${apiVersion}`, authRoutes);
router.use(`${apiVersion}`, usersRoutes);




module.exports = router;

