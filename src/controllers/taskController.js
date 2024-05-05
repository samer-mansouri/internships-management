const { sendResponse } = require('../helpers/responseHelper');

const  {
    createTask,
    getTask,
    getTasksList,
    updateTask,
    deleteTask,
    updateTaskStatus,
    getSpeceficStudentTasks
} = require('../services/taskService');

const addTask = async (req, res) => {
    try {
        const taskData = req.body;
        const task = await createTask(taskData);
        return sendResponse(res, 201, true, 'Task created successfully', task);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await getTask(taskId);
        if (!task) {
            return sendResponse(res, 404, false, 'Task not found');
        }
        return sendResponse(res, 200, true, 'Task retrieved successfully', task);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await getTasksList();
        return sendResponse(res, 200, true, 'Tasks retrieved successfully', tasks);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const updateTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;

        const updatedTask = await updateTask(taskId, taskData);
        return sendResponse(res, 200, true, 'Task updated successfully', updatedTask);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}


const removeTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        await deleteTask(taskId);
        return sendResponse(res, 200, true, 'Task deleted successfully');
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const updateTaskStatusById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const status = req.body.status;

        const updatedTask = await updateTaskStatus(taskId, status);
        return sendResponse(res, 200, true, 'Task status updated successfully', updatedTask);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const getStudentTasks = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const tasks = await getSpeceficStudentTasks(studentId);
        return sendResponse(res, 200, true, 'Student tasks retrieved successfully', tasks);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

module.exports = {
    addTask,
    getTaskById,
    getTasks,
    updateTaskById,
    removeTask,
    updateTaskStatusById,
    getStudentTasks
}