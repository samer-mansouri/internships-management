const express = require('express');
const router = express.Router();


const apiVersion = '/api/v1';

const authRoutes = require('./authRoutes');
const usersRoutes = require('./usersRoutes');
const demandeDeStageRoutes = require('./demandeDeStageRoutes');
const sujetDeStageRoutes = require('./sujetDeStageRoutes');
const announcementRoutes = require('./announcementRoutes');
const evaluationRoutes = require('./evaluationRoutes');
const taskRoutes = require('./taskRoutes');

router.use(`${apiVersion}`, authRoutes);
router.use(`${apiVersion}`, usersRoutes);
router.use(`${apiVersion}`, demandeDeStageRoutes);
router.use(`${apiVersion}`, sujetDeStageRoutes);
router.use(`${apiVersion}`, announcementRoutes);
router.use(`${apiVersion}`, evaluationRoutes);
router.use(`${apiVersion}`, taskRoutes);



module.exports = router;

