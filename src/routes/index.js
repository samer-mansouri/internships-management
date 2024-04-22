const express = require('express');
const router = express.Router();


const apiVersion = '/api/v1';

const authRoutes = require('./authRoutes');
const usersRoutes = require('./usersRoutes');
const demandeDeStageRoutes = require('./demandeDeStageRoutes');
const sujetDeStageRoutes = require('./sujetDeStageRoutes');

router.use(`${apiVersion}`, authRoutes);
router.use(`${apiVersion}`, usersRoutes);
router.use(`${apiVersion}`, demandeDeStageRoutes);
router.use(`${apiVersion}`, sujetDeStageRoutes);



module.exports = router;

