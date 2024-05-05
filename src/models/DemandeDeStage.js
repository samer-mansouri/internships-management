const { EntitySchema } = require("typeorm");

const EtatDemande = {
    EnAttente: 'EN_ATTENTE',
    Acceptee: 'ACCEPTEE',
    Refusee: 'REFUSEE',
};

const TypeDeStage = {
    StagePFE: 'STAGE_PFE',
    StageETE: 'STAGE_ETE',
};

module.exports = new EntitySchema({
    name: "DemandeDeStage",
    tableName: "demandes_de_stage",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        dateSoumission: {
            type: "datetime",
            default: () => "CURRENT_TIMESTAMP"
        },
        etat: {
            type: "enum",
            enum: EtatDemande,
            default: EtatDemande.EnAttente
        },
        type: {
            type: "enum",
            enum: TypeDeStage
        }
    },
    relations: {
        sujetDeStage: {
            target: "SujetDeStage",
            type: "many-to-one",
            joinColumn: true,
            cascade: true,
            nullable: true
        },
        stagiaire: {
            target: "User",
            type: "many-to-one",
            joinColumn: true,
            cascade: true,
            nullable: false
        },
        documents: {
            target: "Document",
            type: "one-to-many",
            cascade: true,
            inverseSide: "relationShipId", // Add this line to specify the inverse side
            joinColumn: true
        }
    }
});
