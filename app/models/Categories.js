module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define("categories", {
    name: {
      type: DataTypes.STRING
    }
  });

  return Categories;
};
