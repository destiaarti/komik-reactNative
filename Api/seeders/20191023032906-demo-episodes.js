"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "episodes",
      [
        {
          webtoonsid: 1,
          episode: "Chapter 1: Start",
       
          image: 'https://i2.wp.com/www.koreanesia.com/wp-content/uploads/2019/04/3-2-3.jpg?resize=480%2C853&ssl=1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          webtoonsid: 2,
          episode: "Chapter 1: Start",
          image: "https://cdn.idntimes.com/content-images/community/2019/03/opera-snapshot-2019-03-13-211947-wwwwebtoonscom-0f5ff5e345298954bf286ad981cd4c9c_600x400.png",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("episodes", null, {});
  }
};
