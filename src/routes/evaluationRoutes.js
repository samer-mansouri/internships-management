const express = require('express');
var router = express.Router();

const {
    addEvaluation,
    getEvaluationById,
    getEvaluations,
    updateEvaluationById,
    removeEvaluation
} = require('../controllers/evaluationController');


router.post(`/evaluations`, addEvaluation);
router.get(`/evaluations/:id`, getEvaluationById);
router.get(`/evaluations`, getEvaluations);
router.put(`/evaluations/:id`, updateEvaluationById);
router.delete(`/evaluations/:id`, removeEvaluation);

module.exports = router;
