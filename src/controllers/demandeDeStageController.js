const { sendResponse } = require('../helpers/responseHelper');

const {
    createDemandeDeStage,
    getDemandeDeStage,
    getDemandeDeStagesList,
    updateDemandeDeStage,
    deleteDemandeDeStage
} = require('../services/demandeDeStageService');


const addDemandeDeStage = async (req, res) => {
    try {
        const demandeDeStageData = req.body;
        const demandeDeStage = await createDemandeDeStage(demandeDeStageData);
        return sendResponse(res, 201, true, 'Demande de stage created successfully', demandeDeStage);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const getDemandeDeStageById = async (req, res) => {
    try {
        const demandeDeStageId = req.params.id;
        const demandeDeStage = await getDemandeDeStage(demandeDeStageId);
        if (!demandeDeStage) {
            return sendResponse(res, 404, false, 'Demande de stage not found');
        }
        return sendResponse(res, 200, true, 'Demande de stage retrieved successfully', demandeDeStage);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const getDemandeDeStages = async (req, res) => {
    try {
        const demandeDeStages = await getDemandeDeStagesList();
        return sendResponse(res, 200, true, 'Demande de stages retrieved successfully', demandeDeStages);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const updateDemandeDeStageById = async (req, res) => {
    try {
        const demandeDeStageId = req.params.id;
        const demandeDeStageData = req.body;

        const updatedDemandeDeStage = await updateDemandeDeStage(demandeDeStageId, demandeDeStageData);
        return sendResponse(res, 200, true, 'Demande de stage updated successfully', updatedDemandeDeStage);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const removeDemandeDeStage = async (req, res) => {
    try {
        const demandeDeStageId = req.params.id;
        await deleteDemandeDeStage(demandeDeStageId);
        return sendResponse(res, 200, true, 'Demande de stage deleted successfully');
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}


module.exports = {
    addDemandeDeStage,
    getDemandeDeStageById,
    getDemandeDeStages,
    updateDemandeDeStageById,
    removeDemandeDeStage
};