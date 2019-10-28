"use strict";
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define(
    "favorite",
    {
      user_id: DataTypes.INTEGER,
      webtoon_id: DataTypes.INTEGER
    },
    {}
  );
  favorite.associate = function(models) {
    // associations can be defined here
    favorite.belongsTo(models.user, {
      foreignKey: "user_id"
    }),
      favorite.belongsTo(models.webtoons, {
        foreignKey: "webtoon_id",
        as: "toonId"
      });
  };
  return favorite;
};
