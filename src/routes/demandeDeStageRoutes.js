const express = require('express');
var router = express.Router();

const {
    addDemandeDeStage,
    getDemandeDeStageById,
    getDemandeDeStages,
    updateDemandeDeStageById,
    removeDemandeDeStage
} = require('../controllers/demandeDeStageController');


router.post(`/demandes-de-stage`, addDemandeDeStage);
router.get(`/demandes-de-stage/:id`, getDemandeDeStageById);
router.get(`/demandes-de-stage`, getDemandeDeStages);
router.put(`/demandes-de-stage/:id`, updateDemandeDeStageById);
router.delete(`/demandes-de-stage/:id`, removeDemandeDeStage);

module.exports = router;


