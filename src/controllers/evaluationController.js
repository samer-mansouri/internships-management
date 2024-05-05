const { sendResponse } = require('../helpers/responseHelper');
const {
    createEvaluation,
    getEvaluation,
    getEvaluationsList,
    updateEvaluation,
    deleteEvaluation
} = require('../services/evaluationService');

const addEvaluation = async (req, res) => {
    try {
        const evaluationData = req.body;
        const evaluation = await createEvaluation(evaluationData);
        return sendResponse(res, 201, true, 'Evaluation created successfully', evaluation);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const getEvaluationById = async (req, res) => {
    try {
        const evaluationId = req.params.id;
        const evaluation = await getEvaluation(evaluationId);
        if (!evaluation) {
            return sendResponse(res, 404, false, 'Evaluation not found');
        }
        return sendResponse(res, 200, true, 'Evaluation retrieved successfully', evaluation);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const getEvaluations = async (req, res) => {
    try {
        const evaluations = await getEvaluationsList();
        return sendResponse(res, 200, true, 'Evaluations retrieved successfully', evaluations);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const updateEvaluationById = async (req, res) => {
    try {
        const evaluationId = req.params.id;
        const evaluationData = req.body;

        const updatedEvaluation = await updateEvaluation(evaluationId, evaluationData);
        return sendResponse(res, 200, true, 'Evaluation updated successfully', updatedEvaluation);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const removeEvaluation = async (req, res) => {
    try {
        const evaluationId = req.params.id;
        await deleteEvaluation(evaluationId);
        return sendResponse(res, 200, true, 'Evaluation deleted successfully');
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}


module.exports = {
    addEvaluation,
    getEvaluationById,
    getEvaluations,
    updateEvaluationById,
    removeEvaluation
};
