const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const regex = /^https?:\/\/(www\.)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorer',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: 'URL inválida',
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Email inválido',
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      const authError = new Error('E-mail ou senha incorretos');
      authError.statusCode = 401;
      return Promise.reject(authError);
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        const authError = new Error('E-mail ou senha incorretos');
        authError.statusCode = 401;
        return Promise.reject(authError);
      }
      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
