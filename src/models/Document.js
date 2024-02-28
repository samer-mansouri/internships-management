const { EntitySchema } = require("typeorm");

const RelationShip = {
    DemandeDeStage: "DemandeDeStage",
    SujetDeStage: "SujetDeStage"
}


module.exports = new EntitySchema({
    name: "Document", // Entity name
    tableName: "documents", // Table name in the database
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        nom: {
            type: "varchar",
            length: 255
        },
        chemin: {
            type: "varchar",
            length: 255
        },
        dateDeCreation: {
            type: "datetime"
        },
        relationShipId: {
            type: "int",
            nullable: true
        },
        relationShipType: {
            type: "enum",
            enum: RelationShip
        }
    },
   
});