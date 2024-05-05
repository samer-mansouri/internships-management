const { getRepository } = require("typeorm");
const Document = require("../models/Document");

let createDocument = async (data) => {
    try {
        const documentRepository = getRepository(Document);
        let document = documentRepository.create(data);
        return await documentRepository.save(document);
    } catch (error) {
        throw new Error(error);
    }
}

let getDocument = async (id) => {
    try {
        const documentRepository = getRepository(Document);
        return await documentRepository.findOne({ where: { id } });
    } catch (error) {
        throw new Error(error);
    }
}

let getDocumentsList = async () => {
    try {
        const documentRepository = getRepository(Document);
        return await documentRepository.find();
    } catch (error) {
        throw new Error(error);
    }
}


let updateDocument = async (id, data) => {
    try {
        const documentRepository = getRepository(Document);
        await documentRepository.update(id, data);
        return await documentRepository.findOne({ where: { id } });
    } catch (error) {
        throw new Error(error);
    }
}
    
let deleteDocument = async (id) => {
    try {
        const documentRepository = getRepository(Document);
        await documentRepository.delete(id);
    } catch (error) {
        throw new Error(error);
    }
}

let getSpeceficDemandeDeStageDocument = async (demandeDeStageId) => {
    try {
        const documentRepository = getRepository(Document);
        console.log("demandeDeStageId : ", demandeDeStageId);
        return await documentRepository.findOne({ where: { relationShipId: demandeDeStageId, relationShipType: "DemandeDeStage" } });
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = {
    createDocument,
    getDocument,
    getDocumentsList,
    updateDocument,
    deleteDocument,
    getSpeceficDemandeDeStageDocument
};
