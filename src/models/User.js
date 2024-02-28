const { EntitySchema } = require("typeorm");

const Gender = {
  Male: 'male',
  Female: 'female',
};

const Role = {
  Admin: 'admin',
  Intern: 'intern',
  Encadrant: 'encadrant',
};

module.exports = new EntitySchema({
  name: "User", // Entity name
  tableName: "users", // Table name in the database
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    firstName: {
      type: "varchar",
      length: 55
    },
    lastName: {
      type: "varchar",
      length: 55
    },
    address: {
      type: "text"
    },
    email: {
      type: "varchar",
      length: 255,
      unique: true
    },
    gender: {
      type: "enum",
      enum: Gender,
      nullable: true
    },
    password: {
      type: "varchar",
      length: 255
    },
    role: {
      type: "enum",
      enum: Role
    }
  },
  relations: {
    // Define relations here
  }
});
