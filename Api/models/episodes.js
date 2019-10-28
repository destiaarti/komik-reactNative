"use strict";
module.exports = (sequelize, DataTypes) => {
  const episodes = sequelize.define(
    "episodes",
    {
      webtoonsId: DataTypes.INTEGER,
      episode: DataTypes.STRING,
      image: DataTypes.STRING
    },
    {}
  );
  episodes.associate = function(models) {
    episodes.belongsTo(models.webtoons, {
      as: "toonId",
      foreignKey: "webtoonsId"
    });
  };
  return episodes;
};
