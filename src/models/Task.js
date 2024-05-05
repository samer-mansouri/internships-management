const { EntitySchema } = require("typeorm");

const status = {
    OPEN: "open",
    IN_PROGRESS: "in_progress",
    DONE: "done"
};

module.exports = new EntitySchema({
    name: "Task",
    tableName: "tasks",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        title: {
            type: "varchar",
            length: 255
        },
        description: {
            type: "text"
        },
        status: {
            type: "enum",
            enum: status
        },
        createdAt: {
            type: "datetime",
            default: () => "CURRENT_TIMESTAMP"
        },
    },
    relations: {
        student: {
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