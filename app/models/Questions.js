module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define("questions", {
    question_text: {
      type: DataTypes.STRING
    }
  });

  return Questions;
};
