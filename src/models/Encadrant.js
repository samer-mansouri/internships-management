const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Encadrant", // Entity name
    tableName: "encadrants", // Table name in the database
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        domainesExpertise: {
            type: "text",
            nullable: true
        },

    },
    relations: {
        //Un Encadrant doit être associé à un seul User
        user: {
            target: "User",
            type: "one-to-one",
            joinColumn: true,
            cascade: true,
            nullable: false
        }
    }
});

