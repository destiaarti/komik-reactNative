"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "pages",
      [
        {
          episodesId: 1,
          image:
            "'https://meispoiler.files.wordpress.com/2018/11/img_8021.jpg",
          page: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          episodesId: 1,
          image:
            "https://meispoiler.files.wordpress.com/2018/11/11.jpg",
          page: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          episodesId: 1,
          image:
            "https://meispoiler.files.wordpress.com/2018/11/3.jpg",
          page: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          episodesId: 1,
          image:
            "https://meispoiler.files.wordpress.com/2018/11/41.jpg",
          page: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("pages", null, {});
  }
};
