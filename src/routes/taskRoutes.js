const express = require('express');
var router = express.Router();

const {
    addTask,
    getTaskById,
    getTasks,
    updateTaskById,
    removeTask,
    updateTaskStatusById,
    getStudentTasks
} = require('../controllers/taskController');


router.post(`/tasks`, addTask);
router.get(`/tasks/:id`, getTaskById);
router.get(`/tasks`, getTasks);
router.put(`/tasks/:id`, updateTaskById);
router.delete(`/tasks/:id`, removeTask);
router.put(`/tasks/:id/status`, updateTaskStatusById);
router.get(`/students/:id/tasks`, getStudentTasks);

module.exports = router;

