const { getRepository } = require('typeorm');

const Task = require('../models/Task');

let createTask = async (data) => {
    try {
        const taskRepository = getRepository(Task);
        let task = taskRepository.create(data);
        return await taskRepository.save(task);
    } catch (error) {
        throw new Error(error);
    }
}

let getTask = async (id) => {
    try {
        const taskRepository = getRepository(Task);
        return await taskRepository.findOne({ where: { id } });
    } catch (error) {
        throw new Error(error);
    }
}

let getTasksList = async () => {
    try {
        const taskRepository = getRepository(Task);
        return await taskRepository.find();
    } catch (error) {
        throw new Error(error);
    }
}

let updateTask = async (id, data) => {
    try {
        const taskRepository = getRepository(Task);
        await taskRepository.update(id, data);
        return await taskRepository.findOne({ where: { id } });
    } catch (error) {
        throw new Error(error);
    }
}

let deleteTask = async (id) => {
    try {
        const taskRepository = getRepository(Task);
        await taskRepository.delete(id);
    } catch (error) {
        throw new Error(error);
    }
}

let updateTaskStatus = async (id, status) => {
    try {
        const taskRepository = getRepository(Task);
        await taskRepository.update(id, { status });
        return await taskRepository.findOne({ where: { id } });
    } catch (error) {
        throw new Error(error);
    }
}

let getSpeceficStudentTasks = async (studentId) => {
    try {
        const taskRepository = getRepository(Task);
        return await taskRepository.find({ where: { studentId } });
    } catch (error) {
        throw new Error(error);
    }
}



module.exports = {
    createTask,
    getTask,
    getTasksList,
    updateTask,
    deleteTask,
    updateTaskStatus,
    getSpeceficStudentTasks
};