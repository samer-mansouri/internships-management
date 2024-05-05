const User = require('./User');
const DemandeDeStage = require('./DemandeDeStage');
const SujetDeStage = require('./SujetDeStage');
const Document = require('./Document');
const Intern = require('./Intern');
const Encadrant = require('./Encadrant');
const Announcement = require('./Announcement');
const Evaluation = require('./Evaluation');
const Task = require('./Task');

const models = [
    User,
    DemandeDeStage,
    SujetDeStage,
    Document,
    Intern,
    Encadrant,
    Announcement,
    Evaluation,
    Task
];

module.exports = models;