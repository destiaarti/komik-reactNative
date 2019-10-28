"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      avatar: DataTypes.STRING
    },
    {}
  );
  user.associate = function(models) {
    user.belongsToMany(models.webtoons, {
      through: models.favorite,
      as: "toons",
      foreignKey: "user_id"
    });
  };
  return user;
};
