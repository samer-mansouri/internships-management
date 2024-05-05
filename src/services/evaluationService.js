const { getRepository } = require('typeorm');
const Evaluation = require('../models/Evaluation');

let createEvaluation = async (data) => {
    try {
        const evaluationRepository = getRepository(Evaluation);
        let evaluation = evaluationRepository.create(data);
        return await evaluationRepository.save(evaluation);
    } catch (error) {
        throw new Error(error);
    }
}

let getEvaluation = async (id) => {
    try {
        const evaluationRepository = getRepository(Evaluation);
        return await evaluationRepository.findOne({ where: { id } });
    } catch (error) {
        throw new Error(error);
    }
}

let getEvaluationsList = async () => {
    try {
        const evaluationRepository = getRepository(Evaluation);
        return await evaluationRepository.find();
    } catch (error) {
        throw new Error(error);
    }
}

let updateEvaluation = async (id, data) => {
    try {
        const evaluationRepository = getRepository(Evaluation);
        await evaluationRepository.update(id, data);
        return await evaluationRepository.findOne({ where: { id } });
    } catch (error) {
        throw new Error(error);
    }
}

let deleteEvaluation = async (id) => {
    try {
        const evaluationRepository = getRepository(Evaluation);
        await evaluationRepository.delete(id);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    createEvaluation,
    getEvaluation,
    getEvaluationsList,
    updateEvaluation,
    deleteEvaluation
};

