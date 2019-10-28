"use strict";
module.exports = (sequelize, DataTypes) => {
  const pages = sequelize.define(
    "pages",
    {
      episodesId: DataTypes.INTEGER,
      image: DataTypes.STRING,
      page: DataTypes.STRING
    },
    {}
  );
  pages.associate = function(models) {
    pages.belongsTo(models.episodes, {
      as: "myEpisode",
      foreignKey: "episodesId"
    });
  };
  return pages;
};
