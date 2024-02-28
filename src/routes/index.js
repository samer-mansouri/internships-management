const express = require('express');
const router = express.Router();


const apiVersion = '/api/v1';

const authRoutes = require('./authRoutes');

router.use(`${apiVersion}`, authRoutes);




module.exports = router;

