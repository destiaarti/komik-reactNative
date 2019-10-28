"use strict";
module.exports = (sequelize, DataTypes) => {
  const webtoons = sequelize.define(
    "webtoons",
    {
      title: DataTypes.STRING,
      genre: DataTypes.STRING,
      image: DataTypes.STRING,
      createdBy: DataTypes.INTEGER
    },
    {}
  );
  webtoons.associate = function(models) {
    webtoons.belongsTo(models.user, {
      as: "created_by",
      foreignKey: "createdBy"
    });
    webtoons.belongsToMany(models.user, {
      through: models.favorite,
      as: "favorites",
      foreignKey: "webtoon_id"
    });
  };
  return webtoons;
};
