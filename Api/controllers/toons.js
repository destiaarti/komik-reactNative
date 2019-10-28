const models = require("../models");
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Toons = models.webtoons;
const User = models.user;
const Episodes = models.episodes;
const Pages = models.pages;
const Fav = models.favorite;

// get all webtoons
const getToons = data => {
  const newData = data.map(item => {
    let newItem = {
      id: item.id,
      title: item.title,
      genre: item.genre,
      favorites: item.favorites,
      //isFavorite: item.favorites.length > 0,
      image: item.image,
      createdAt: item.createdAt,
      updatedAt: item.createdAt,
      createdBy: item.created_by.id
    };
    return newItem;
  });
  return newData;
};

// get all webtoons favorite
const getFavorite = data => {
  const input = data.filter(item => item.isFavorite);

  let newData = input.map(item => {
    let newItem = {
      title: item.title,
      genre: item.genre,
      isFavorite: item.isFavorite,
      image: item.image,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    };
    return newItem;
  });
  return newData;
};

exports.showAllToons = (req, res) => {
  Toons.findAll({
    include: [
      {
        model: User,
        as: "created_by",
        attributes: ["id"]
      },
      {
        model: User,
        as: "favorites"
      }
    ],
    attributes: { exclude: ["genre", "createdBy"] }
  }).then(data => {
    let newData;

    if (req.query.isFavorite == "true") newData = getFavorite(data);
    else if (req.query.title) newData = getToonsByTitle(data, req.query.title);
    else newData = getToons(data);
    res.send(newData);
  });
};

// get all toons by title
const getToonsByTitle = (data, title) => {
  const input = data.filter(item => {
    return item.title.toLowerCase().includes(title.toLowerCase());
  });
  let newData = input.map(item => {
    let newItem = {
      title: item.title,
      genre: item.genre,
      isFavorite: item.isFavorite,
      image: item.image,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      createdBy: item.created_by.id
    };
    return newItem;
  });
  return newData;
};

exports.show = (req, res) => {
  Toons.findAll({
    include: {
      model: User,
      as: "created_by"
    }
    // attributes: { exclude: ["id"] }
  }).then(data => {
    let newData;
    if (req.query.isFavorite == "true") {
      newData = getFavorite(data);
    } else if (req.query.title) {
      newData = getToonsByTitle(data, req.query.title);
    } else {
      newData = getToons(data);
    }
    res.send(newData);
  });
};

exports.showid = (req, res) => {
  Toons.findOne({ where: { id: req.params.id } }).then(data => res.send(data));
};

exports.episode = (req, res) => {
  const id = req.params.toon_id;

  Episodes.findAll({
    where: { webtoonsId: id },
    attributes: { exclude: ["webtoonsId"] }
  }).then(data => {
    res.send(data);
  });
};

exports.detailEpisode = (req, res) => {
  const toonsId = req.params.toon_id;
  const epsId = req.params.eps_id;
  console.log(toonsId, epsId);

  Pages.findAll({
    include: [
      {
        model: Episodes,
        as: "myEpisode",
        where: { webtoonsId: toonsId, id: epsId },
        attributes: []
      }
    ],
    attributes: {
      exclude: ["id", "episodesId"]
    }
  }).then(data => {
    res.send(data);
  });
};

exports.getCreatedToons = (req, res) => {
  const user_id = req.params.user_id;

  Toons.findAll({
    where: { createdBy: user_id },
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    }
  }).then(data => res.send(data));
};

exports.storeCreatedToons = (req, res) => {
  const id = req.params.user_id;

  Toons.create({
    title: req.body.title,
    genre: req.body.genre,
    isFavorite: false,
    image: req.body.image,
    createdBy: id
  }).then(data => res.send(data));
};

exports.showEpsCreatedUser = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.toon_id;

  Episodes.findAll({
    include: [
      {
        model: Toons,
        as: "toonId",
        where: { createdBy: userId, id: toonId },
        attributes: {
          exclude: ["id", "isFavorite", "image", "createdAt", "updatedAt"]
        }
      }
    ],
    attributes: { exclude: ["id", "webtoonsId"] }
  }).then(data => {
    res.send(data);
  });
};

exports.updateMyToon = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.toon_id;

  Toons.update(
    {
      title: req.body.title,
      genre: req.body.genre,
      image: req.body.image
    },
    {
      where: { createdBy: userId, id: toonId }
    }
  )
    //   .then(data => {
    //     res.send({
    //       //   status: "succes",
    //       //   Message: "Data Has been Updated",
    //       data
    //     });
    //   });
    .then(() => {
      Toons.findOne({
        //   include: [
        //     {
        //       model: User,
        //       as: "isFavorite"
        //     }
        //   ],
        //   attributes: { exclude: ["genre", "created_by"] },
        where: { createdBy: userId, id: toonId }
      }).then(data => {
        res.send(getUpdatedToons(data));
      });
    });
};

// Get updated toon
getUpdatedToons = data => {
  const newData = {
    id: data.id,
    title: data.title,
    genre: data.genre,
    isFavorite: data.isFavorite.length ? true : false,
    image: data.image,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
  return newData;
};

exports.deleteMyToon = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.toon_id;
  Toons.destroy({
    where: { createdBy: userId, id: toonId }
  })
    // .then(data => {
    //   res.send({
    //     delete: "succes"
    //   });
    // })
    .then(data => {
      res.status(200).json({ id: toonId });
    });
  // .catch(err => {
  //   console.log(err);
  // });
};

exports.createEpsToon = (req, res) => {
  User.findAll({
    where: {
      id: req.params.user_id
    }
  }).then(() => {
    Episodes.create({
      episode: req.body.episode,
      image: req.body.image,
      webtoonsId: req.params.toon_id
    }).then(data => {
      console.log(data);

      res.send(data);
    });
  });
};

exports.showImgEPs = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.toon_id;
  const epsId = req.params.eps_id;

  Pages.findAll({
    include: [
      {
        model: Episodes,
        as: "myEpisode",
        where: { webtoonsId: toonId, id: epsId },
        attributes: [],
        include: [
          {
            model: Toons,
            as: "toonId",
            where: { createdBy: userId, id: toonId },
            attributes: []
          }
        ]
      }
    ],
    attributes: ["image"]
  }).then(data => {
    res.send(data);
  });
};

exports.updateMyEps = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.toon_id;
  const epsId = req.params.eps_id;

  Toons.findAll({
    where: { createdBy: userId, id: toonId }
  }).then(data => {
    if (data.length > 0) {
      Episodes.update(
        {
          episode: req.body.episode,
          image: req.body.image
        },
        {
          where: { webtoonsId: toonId, id: epsId }
        }
      ).then(() => {
        Episodes.findOne({
          where: { webtoonsId: toonId, id: epsId }
        }).then(data => {
          res.send(data);
        });
      });
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  });
};

exports.deleteMyEps = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.toon_id;
  const epsId = req.params.eps_id;

  Toons.findAll({
    where: { createdBy: userId, id: toonId }
  }).then(data => {
    Episodes.destroy({
      where: { webtoonsId: toonId, id: epsId }
    }).then(deleted => {
      res.status(200).json({ id: epsId });
    });
  });
};

exports.createImgEps = (req, res) => {
  const body = {
    page: req.body.page,
    image: req.body.image,
    episodesId: req.params.eps_id
  };
  Pages.create(body)
    .then(post => {
      res.send({
        message: "success",
        post
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.deleteImgEps = (req, res) => {
  const userId = req.params.user_id;
  const toonId = req.params.toon_id;
  const epsId = req.params.eps_id;
  const imgId = req.params.img_id;

  Pages.findAll({
    include: [
      {
        model: Episodes,
        as: "myEpisode",
        where: { webtoonsId: toonId, id: epsId },
        attributes: [],
        include: [
          {
            model: Toons,
            as: "toonId",
            where: { createdBy: userId, id: toonId },
            attributes: []
          }
        ]
      }
    ]
  }).then(items => {
    if (items.length > 0) {
      Pages.destroy({
        where: { episodesId: epsId, id: imgId }
      }).then(deleted => {
        res.status(200).json({ id: imgId });
      });
    }
  });
};

exports.favIndex = (req,res) => {
  if (req.query.title){
    Fav.findAll({
      where: {user_id : req.params.id },
      include: {
        model: Toons,
        as: 'toonId',
        where: { title: {[Op.like]: `%${req.query.title}%`} }
      }
    }).then(sketch=>res.send(sketch))
  } else {
    Fav.findAll({
    where: {user_id : req.params.id},
    include: {
      model: Toons,
      as: 'toonId'
    }
  })
  .then(sketch=>res.send(sketch))
  }
}

exports.FavStore = (req,res) => {
  Fav.create({
    user_id: JSON.parse(req.params.id),
    webtoon_id: req.body.webtoon_id
  }
  ).then(data=>{
    res.send({
    message: 'success',
    data
  })
})
}

exports.FavDestroy = (req,res) => {

  Fav.destroy(
    {where: {
      webtoon_id: req.body.webtoon_id, 
      user_id: req.params.id}
    })
    .then(sketch => {
    res.send({
      message: 'success',
    }) 
  }) 
}