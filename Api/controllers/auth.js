const jwt = require("jsonwebtoken");

const models = require("../models");
const User = models.user;
const bcrypt = require("bcrypt");
const multer = require("multer");

const ip = `http://192.168.1.67:2019/`;
const upload = multer({ dest: "./images" });

exports.login = (req, res) => {
  // const email = req.body.email;
  // const password = req.body.password;

  // User.findOne({ where: { email } }).then(user => {
  //   const authorization = bcrypt.compareSync(password, user.password);
  //   if (authorization) {
  //     const token = jwt.sign({ id: user.id }, "my-secret-key");
  //     res.send({
  //       id: user.id,
  //       login: true,
  //       token
  //     });
  //   } else {
  //     res.send({
  //       login: false,
  //       message: "Wrong Email or Password Invalid !"
  //     });
  //   }
  // });
  User.findOne({
    where: { email: req.body.email }
  }).then(user => {
    if (user) {
      const authorize = bcrypt.compareSync(req.body.password, user.password);

      if (authorize) {
        const token = jwt.sign({ id: user.id }, "my-secret-key");

        res.send({
          id: user.id,
          email: user.email,
          token
        });
      } else {
        res.status(201).send({
          message: "Validation error: Wrong password!"
        });
      }
    } else {
      res.status(201).send({
        message: "Validation error: Unregistered email!"
      });
    }
  });
};

exports.register = (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  User.create({
    email: req.body.email,
    password: hashedPassword,
    name: req.body.name
  }).then(user => {
    if (user) {
      const token = jwt.sign({ id: user.id }, "my-secret-key");
      res.send({
        id: user.id,
        email: user.email,
        register: "Succesfull",
        token
      });
    }
  });
};

exports.update = (req, res) => {
  console.log(req.file);
  const data = {
    name: req.body.name,
    avatar: ip + req.file.path
  };
  User.update(data, {
    where: {
      id: req.params.user_id
    }
  }).then(user => {
    res.send({
      message: "success uploading",
      user
    });
  });
};

exports.index = (req, res) => {
  User.findOne({ where: { id: req.params.user_id } }).then(user => {
    res.send(user);
  });
};
