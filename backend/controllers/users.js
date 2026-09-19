const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { JWT_SECRET } = process.env;
  return User.findUserByCredentials(email, password).then((user) => {
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.send({ token });
  }).catch(next);
};
module.exports.createUser = (req, res, next) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({ email, password: hash })
      .then((user) => {
        res.status(201).send(user);
      })
      .catch(next);
  });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatarData } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar: avatarData },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((avatar) => res.send(avatar))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id).orFail().then((user) => {
    res.send(user);
  }).catch(next);
};
