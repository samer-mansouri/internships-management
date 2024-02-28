const { EntitySchema } = require("typeorm");


module.exports = new EntitySchema({
    name: "Intern", // Entity name
    tableName: "interns", // Table name in the database
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        compétences: {
            //Comma separated string
            type: "text",
        },
        formation: {
            type: "varchar",
            length: 255
        },
        faculté: {
            type: "varchar",
            length: 255
        },
        université: {
            type: "varchar",
            length: 255
        },
        niveauEtude: {
            type: "varchar",
            length: 255
        }
    },
    relations: {
        // Define relations here
        //Un Intern peut avoir plusieurs Demandes de Stage
        demandesDeStage: {
            target: "DemandeDeStage",
            type: "one-to-many",
            cascade: true
        },
        //Un intern doit être associé à un seul User
        user: {
            target: "User",
            type: "one-to-one",
            joinColumn: true,
            cascade: true,
            nullable: false
        }
    }
});