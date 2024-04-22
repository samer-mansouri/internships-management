const { sendResponse } = require('../helpers/responseHelper');

const {
    createSujetDeStage,
    getSujetDeStage,
    getSujetDeStagesList,
    updateSujetDeStage,
    deleteSujetDeStage
} = require('../services/sujetDeStageService');


const addSujetDeStage = async (req, res) => {
    try {
        const sujetDeStageData = req.body;
        const sujetDeStage = await createSujetDeStage(sujetDeStageData);
        return sendResponse(res, 201, true, 'Sujet de stage created successfully', sujetDeStage);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const getSujetDeStageById = async (req, res) => {
    try {
        const sujetDeStageId = req.params.id;
        const sujetDeStage = await getSujetDeStage(sujetDeStageId);
        if (!sujetDeStage) {
            return sendResponse(res, 404, false, 'Sujet de stage not found');
        }
        return sendResponse(res, 200, true, 'Sujet de stage retrieved successfully', sujetDeStage);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const getSujetDeStages = async (req, res) => {
    try {
        const sujetDeStages = await getSujetDeStagesList();
        return sendResponse(res, 200, true, 'Sujet de stages retrieved successfully', sujetDeStages);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const updateSujetDeStageById = async (req, res) => {
    try {
        const sujetDeStageId = req.params.id;
        const sujetDeStageData = req.body;

        const updatedSujetDeStage = await updateSujetDeStage(sujetDeStageId, sujetDeStageData);
        return sendResponse(res, 200, true, 'Sujet de stage updated successfully', updatedSujetDeStage);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const removeSujetDeStage = async (req, res) => {
    try {
        const sujetDeStageId = req.params.id;
        await deleteSujetDeStage(sujetDeStageId);
        return sendResponse(res, 200, true, 'Sujet de stage deleted successfully');
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

module.exports = {
    addSujetDeStage,
    getSujetDeStageById,
    getSujetDeStages,
    updateSujetDeStageById,
    removeSujetDeStage
};