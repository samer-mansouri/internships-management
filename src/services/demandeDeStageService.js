const { getRepository } = require("typeorm");
const DemandeDeStage = require("../models/DemandeDeStage"); // Make sure to adjust this path to your DemandeDeStage entity schema
const { getSpeceficDemandeDeStageDocument } = require("./documentService");

let createDemandeDeStage = async (data) => {

    try {
        const demandeDeStageRepository = getRepository(DemandeDeStage);
        let demandeDeStage = demandeDeStageRepository.create(data);
        return await demandeDeStageRepository.save(demandeDeStage);
    } catch (error) {
        throw new Error(error);
    }
}


let getDemandeDeStage = async (id) => {
    try {
        const demandeDeStageRepository = getRepository(DemandeDeStage);
        return await demandeDeStageRepository.findOne({ where: { id } });
    } catch (error) {
        throw new Error(error);
    }
}
let getDemandeDeStagesList = async () => {
    try {
        const demandeDeStageRepository = getRepository(DemandeDeStage);
        let demandeDeStages = await demandeDeStageRepository.find();

        const promises = demandeDeStages.map(async (demandeDeStage) => {
            const doc = await getSpeceficDemandeDeStageDocument(demandeDeStage.id);
            demandeDeStage.document = doc;
            return demandeDeStage;
        });

        demandeDeStages = await Promise.all(promises);

        return demandeDeStages;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

let updateDemandeDeStage = async (id, data) => {
    try {
        const demandeDeStageRepository = getRepository(DemandeDeStage);
        await demandeDeStageRepository.update(id, data);
        return await demandeDeStageRepository.findOne({ where: { id } });
    } catch (error) {
        throw new Error(error);
    }
}

let deleteDemandeDeStage = async (id) => {
    try {
        const demandeDeStageRepository = getRepository(DemandeDeStage);
        await demandeDeStageRepository.delete(id);
    } catch (error) {
        throw new Error(error);
    }
}

let demandeDeStageAddDocument = async (id, document) => {
    try {
        const demandeDeStageRepository = getRepository(DemandeDeStage);
        const demandeDeStage = await demandeDeStageRepository.findOne({ where: { id } });

        if (!demandeDeStage) {
            throw new Error("Demande de stage not found");
        }

        demandeDeStage.document = document;
        return await demandeDeStageRepository.save(demandeDeStage);
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = {
    createDemandeDeStage,
    getDemandeDeStage,
    getDemandeDeStagesList,
    updateDemandeDeStage,
    deleteDemandeDeStage,
    demandeDeStageAddDocument
}