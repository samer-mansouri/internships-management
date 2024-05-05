const { EntitySchema } = require("typeorm");


module.exports = new EntitySchema({
    name: "Announcement",
    tableName: "announcements",
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
        content: {
            type: "text"
        },
        createdAt: {
            type: "datetime",
            default: () => "CURRENT_TIMESTAMP"
        },
    },

});
