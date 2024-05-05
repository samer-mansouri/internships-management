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
            type: "datetime",
            default: () => "CURRENT_TIMESTAMP"
        },
        extension: {
            type: "varchar",
            length: 255
        },
        relationShipId: {
            type: "int",
            nullable: true
        },
        relationShipType: {
            type: "enum",
            enum: RelationShip
        },
        size: {
            type: "int",
            nullable: true
        }
    },
    relations: () => {
        const relations = {};
        Object.values(RelationShip).forEach(type => {
            relations[type] = {
                target: type === RelationShip.DEMANDE_DE_STAGE ? "DemandeDeStage" : "SujetDeStage",
                type: "many-to-one",
                joinColumn: { name: "relationShipId" },
                inverseJoinColumn: { name: "id" },
                nullable: true,
                eager: true
            };
        });
        return relations;
    }
   
});