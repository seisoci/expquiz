const dbConfig = require("../db/config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  define: {
    paranoid: true
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.questions_results = require("./QuestionsResults.js")(sequelize, Sequelize);
db.tutorials = require("./Tutorial.model.js")(sequelize, Sequelize);
db.users = require("./Users.js")(sequelize, Sequelize);
db.categories = require("./Categories.js")(sequelize, Sequelize);
db.options = require("./Options.js")(sequelize, Sequelize);
db.questions = require("./Questions.js")(sequelize, Sequelize);
db.results = require("./Results.js")(sequelize, Sequelize);

//questions = results
db.questions_results.belongsTo(db.options);

//users
db.users.hasMany(db.results, { onDelete: "CASCADE" });

//options
db.options.belongsTo(db.questions);

//categories
db.categories.hasMany(db.questions, { onDelete: "CASCADE" });

//questions
db.questions.hasMany(db.options, { onDelete: "CASCADE" });
db.questions.belongsToMany(db.results, {
  through: { model: db.questions_results, unique: false }
});
db.questions.belongsTo(db.categories, { onDelete: "CASCADE" });

//results
db.results.belongsTo(db.users);
db.results.belongsToMany(db.questions, {
  through: { model: db.questions_results, unique: false }
});

module.exports = db;
