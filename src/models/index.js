const User = require('./User');
const DemandeDeStage = require('./DemandeDeStage');
const SujetDeStage = require('./SujetDeStage');
const Document = require('./Document');
const Intern = require('./Intern');
const Encadrant = require('./Encadrant');

const models = [
    User,
    DemandeDeStage,
    SujetDeStage,
    Document,
    Intern,
    Encadrant
];

module.exports = models;