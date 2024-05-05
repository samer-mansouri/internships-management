const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Evaluation",
    tableName: "evaluations",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        comments : {
            type: "text",
            nullable: true
        },

        note: {
            type: "int",
            nullable: true,
        },

        createdAt: {
            type: "datetime",
            default: () => "CURRENT_TIMESTAMP"
        },
    },

    relations: {
        //Un Encadrant doit être associé à un seul User
        stagiaire: {
            target: "User",
            type: "many-to-one",
            joinColumn: true,
            cascade: true,
            nullable: false
        },
        encadrant: {
            target: "Encadrant",
            type: "many-to-one",
            joinColumn: true,
            cascade: true,
            nullable: false
        },
    }

});