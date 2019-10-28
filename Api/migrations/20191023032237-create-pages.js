"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("pages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      episodesId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "episodes",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      image: {
        type: Sequelize.STRING
      },
      page: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("pages");
  }
};
