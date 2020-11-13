module.exports = (sequelize, DataTypes) => {
  const Results = sequelize.define("results", {
    total_points: {
      type: DataTypes.INTEGER
    }
  });

  return Results;
};
