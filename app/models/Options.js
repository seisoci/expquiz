module.exports = (sequelize, DataTypes) => {
  const Options = sequelize.define("options", {
    option_text: {
      type: DataTypes.TEXT("long")
    },
    points: {
      type: DataTypes.INTEGER
    }
  });

  return Options;
};
