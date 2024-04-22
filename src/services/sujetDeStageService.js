const { getRepository } = require("typeorm");
const SujetDeStage = require("../models/SujetDeStage");

let createSujetDeStage = async (data) => {
    try {
        const sujetDeStageRepository = getRepository(SujetDeStage);
        let sujetDeStage = sujetDeStageRepository.create(data);
        return await sujetDeStageRepository.save(sujetDeStage);
    } catch (error) {
        throw new Error(error);
    }
}

let getSujetDeStage = async (id) => {
    try {
        const sujetDeStageRepository = getRepository(SujetDeStage);
        return await sujetDeStageRepository.findOne({ where: { id } });
    } catch (error) {
        throw new Error(error);
    }
}

let getSujetDeStagesList = async () => {
    try {
        const sujetDeStageRepository = getRepository(SujetDeStage);
        return await sujetDeStageRepository.find();
    } catch (error) {
        throw new Error(error);
    }
}

let updateSujetDeStage = async (id, data) => {
    try {
        const sujetDeStageRepository = getRepository(SujetDeStage);
        await sujetDeStageRepository.update(id, data);
        return await sujetDeStageRepository.findOne({ where: { id } });
    } catch (error) {
        throw new Error(error);
    }
}


let deleteSujetDeStage = async (id) => {
    try {
        const sujetDeStageRepository = getRepository(SujetDeStage);
        await sujetDeStageRepository.delete(id);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    createSujetDeStage,
    getSujetDeStage,
    getSujetDeStagesList,
    updateSujetDeStage,
    deleteSujetDeStage
};

