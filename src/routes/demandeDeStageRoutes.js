const express = require('express');
var router = express.Router();

const {
    addDemandeDeStage,
    getDemandeDeStageById,
    getDemandeDeStages,
    updateDemandeDeStageById,
    removeDemandeDeStage,
    addDocumentToDemandeDeStage
} = require('../controllers/demandeDeStageController');
const multerConfig = require('../config/multerConfig');

const upload = multerConfig.single('document');

router.post(`/demandes-de-stage`, addDemandeDeStage);
router.get(`/demandes-de-stage/:id`, getDemandeDeStageById);
router.get(`/demandes-de-stage`, getDemandeDeStages);
router.put(`/demandes-de-stage/:id`, updateDemandeDeStageById);
router.delete(`/demandes-de-stage/:id`, removeDemandeDeStage);
router.post(`/demandes-de-stage/:id/documents`, upload, addDocumentToDemandeDeStage);

module.exports = router;


