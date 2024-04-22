const express = require('express');
var router = express.Router();

const {
    addSujetDeStage,
    getSujetDeStageById,
    getSujetDeStages,
    updateSujetDeStageById,
    removeSujetDeStage
} = require('../controllers/sujetDeStageController');


router.post(`/sujets-de-stage`, addSujetDeStage);
router.get(`/sujets-de-stage/:id`, getSujetDeStageById);
router.get(`/sujets-de-stage`, getSujetDeStages);
router.put(`/sujets-de-stage/:id`, updateSujetDeStageById);
router.delete(`/sujets-de-stage/:id`, removeSujetDeStage);

module.exports = router;
