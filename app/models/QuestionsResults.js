module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define(
    "questions_results",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      points: {
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false
    }
  );

  return Questions;
};
