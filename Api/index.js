require("express-group-routes");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
const port = 2019;

app.use(bodyParser.json());
app.use("/images", express.static("images"));

//multer
const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./images");
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({
  storage: Storage,
  limits: {
    fileSize: 10000000 // Byte
  }
});

//image

// controllers
const AuthController = require("./controllers/auth");
const ToonsControllers = require("./controllers/toons");

// midlewares
const { authenticated, authorized } = require("./middleware");

// group routes here
app.group("/api/v1", router => {
  // Home page route
  router.get("/", (req, res) => {
    res.send("Hello ini adalah aplikasi Webtoon");
  });

  //Get User Info
  router.get("/user/:user_id", AuthController.index);
  // Update Image User avatar
  router.put("/user/:user_id", upload.single("avatar"), AuthController.update);
  // register & Login API
  router.post("/register", AuthController.register);
  router.post("/login", AuthController.login);

  // other API goes here
  router.get("/webtoon/:id", ToonsControllers.showid);
  router.get("/webtoon/:toon_id/episodes", ToonsControllers.episode);
  router.get(
    "/webtoon/:toon_id/episode/:eps_id",
    ToonsControllers.detailEpisode
  );

  // Privates API
  // Get Router
  router.get("/webtoons", ToonsControllers.show);
  router.get(
    "/user/:user_id/webtoons",
    authenticated,
    ToonsControllers.getCreatedToons
  );
  router.get(
    "/user/:user_id/webtoon/:toon_id/episodes",
    authenticated,
    ToonsControllers.showEpsCreatedUser
  );

  // Get/Search all toons
  router.get(
    "/user/:user_id/all_webtoons",
    authenticated,
    authorized,
    ToonsControllers.showAllToons
  );

  // Post Router
  router.post(
    "/user/:user_id/webtoon",
    authenticated,
    ToonsControllers.storeCreatedToons
  );

  // Update Router -- my webtoon
  router.put(
    "/user/:user_id/webtoon/:toon_id",
    authenticated,
    ToonsControllers.updateMyToon
  );

  // Delete Router
  router.delete(
    "/user/:user_id/webtoon/:toon_id",
    authenticated,
    ToonsControllers.deleteMyToon
  );

  // POST create my episode
  router.post(
    "/user/:user_id/webtoon/:toon_id/episode",
    authenticated,
    ToonsControllers.createEpsToon
  );

  // get all images of an episode
  router.get(
    "/user/:user_id/webtoon/:toon_id/episode/:eps_id/images",
    authenticated,
    ToonsControllers.showImgEPs
  );

  // update my episode
  router.put(
    "/user/:user_id/webtoon/:toon_id/episode/:eps_id",
    authenticated,
    ToonsControllers.updateMyEps
  );

  // delete my episode
  router.delete(
    "/user/:user_id/webtoon/:toon_id/episode/:eps_id",
    authenticated,
    ToonsControllers.deleteMyEps
  );

  // create an images for a episode
  router.post(
    "/user/:user_id/webtoon/:toon_id/episode/:eps_id/image",
    authenticated,
    ToonsControllers.createImgEps
  );

  router.delete(
    "/user/:user_id/webtoon/:toon_id/episode/:eps_id/image/:img_id",
    authenticated,
    ToonsControllers.deleteImgEps
  );

  //Favorite
  router.get("/user/:id/favorites", authenticated, ToonsControllers.favIndex);
  router.post("/user/:id/favorite", authenticated, ToonsControllers.FavStore);
  router.delete(
    "/user/:id/favorite",
    authenticated,
    ToonsControllers.FavDestroy
  );
});

app.listen(port, () => console.log(`Listening on port ${port} !`));
