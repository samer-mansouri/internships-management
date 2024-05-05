const { sendResponse } = require('../helpers/responseHelper');

const {
    createDemandeDeStage,
    getDemandeDeStage,
    getDemandeDeStagesList,
    updateDemandeDeStage,
    deleteDemandeDeStage,
    demandeDeStageAddDocument
} = require('../services/demandeDeStageService');


const { createDocument,
    updateDocument,
 } = require('../services/documentService');


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
        console.log(demandeDeStages.length);
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

const addDocumentToDemandeDeStage = async (req, res) => {
    //file upload logic, req.file contains the file
    try {
        const demandeDeStageId = req.params.id;
        // console.log(req.file);
        // console.log(req.body);  
        try {
            const documentData = {
                nom: req.file.originalname,
                chemin: req.file.path,
                extension: req.file.mimetype,
                size: req.file.size
            }
            
            console.log(documentData);
            const addedDocument = await createDocument(documentData);
            // const documentData = req.body;
            const updatedDemandeDeStage = await demandeDeStageAddDocument(demandeDeStageId, documentData);
            console.log(updatedDemandeDeStage);
            addedDocument.relationShipId = updatedDemandeDeStage.id;
            addedDocument.relationShipType = "DemandeDeStage";

            updateDocument(addedDocument.id, addedDocument);
            
            return sendResponse(res, 200, true, 'Document added to demande de stage successfully', updatedDemandeDeStage);
        } catch (error) {
            console.log(error);
        }
       
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

module.exports = {
    addDemandeDeStage,
    getDemandeDeStageById,
    getDemandeDeStages,
    updateDemandeDeStageById,
    removeDemandeDeStage,
    addDocumentToDemandeDeStage
};