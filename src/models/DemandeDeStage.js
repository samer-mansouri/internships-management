const { EntitySchema } = require("typeorm");

const EtatDemande = {
    EnAttente: 'EN_ATTENTE',
    Acceptee: 'ACCEPTEE',
    Refusee: 'REFUSEE',
}

const TypeDeStage = {
    StagePFE: 'STAGE_PFE',
    StageETE: 'STAGE_ETE',
}

module.exports = new EntitySchema({
    name: "DemandeDeStage", // Entity name
    tableName: "demandes_de_stage", // Table name in the database
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
        // Define relations here
        //Une Demande Concerne un seul Sujet de Stage
        //Obligatoire
        sujetDeStage: {
            target: "SujetDeStage",
            type: "many-to-one",
            joinColumn: true,
            cascade: true,
            //cant be null
            nullable: true
        },
        //Une demande de stage concerne un seul stagiaire
        //Obligatoire (on peut ajouter role check pour le user?)
        stagiaire: {
            target: "User",
            type: "many-to-one",
            joinColumn: true,
            cascade: true,
            //cant be null
            nullable: false
        },
        //peut avoir 1 à plusieurs documents
        documents: {
            target: "Document",
            type: "one-to-many",
            cascade: true
        },  

    }
});