module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    email: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  return Users;
};
