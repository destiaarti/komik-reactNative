"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "webtoons",
      [
        {
          title: 'The Secret of Angel',
          genre: 'Romance',
          image :'https://i.pinimg.com/236x/17/7a/98/177a9886500d8976318cead61edeef60.jpg',
          createdBy: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Pasutri Gaje',
          genre: 'Fantasy',
          image : 'https://i.pinimg.com/originals/b9/61/a3/b961a36cc511cdb9a2b5a3403d7bcead.jpg',
          createdBy: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Young Mom',
      genre: 'Fantasy',
      image : 'https://vignette.wikia.nocookie.net/webtoon/images/8/85/SAMPUL_Young_Mom.jpg',
          createdBy: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("webtoons", null, {});
  }
};
