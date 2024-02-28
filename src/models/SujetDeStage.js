const { EntitySchema } = require("typeorm");

const Domaine = {
    Observation: "OBSERVATION",
    Operationnel: "OPERATIONNEL",
    Projet: "PROJET",
    Recherche: "RECHERCHE",
    Finance: "FINANCE",
    Marketing: "MARKETING"
}

module.exports = new EntitySchema({
    name: "SujetDeStage", // Entity name
    tableName: "sujets_de_stage", // Table name in the database
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        intitule: {
            type: "varchar",
            length: 255
        },
        description: {
            type: "text"
        },
        domaine: {
            type: "enum",
            enum: Domaine
        },
        dateDeCreation: {
            type: "datetime"
        },
        estDisponible: {
            type: "boolean",
            default: true
        }
    },
    relations: {
        // Define relations here
        //Un Sujet de Stage peut concerner plusieurs Demandes de Stage
        demandesDeStage: {
            target: "DemandeDeStage",
            type: "one-to-many",
            cascade: true
        },
        //peut avoir 1 à plusieurs documents
        documents: {
            target: "Document",
            type: "one-to-many",
            cascade: true
        },
    }
});