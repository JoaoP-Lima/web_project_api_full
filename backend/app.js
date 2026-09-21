require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const errorHandler = require('./middlewares/error');
const { logger, errorLogger } = require('./middlewares/logger');

const auth = require('./middlewares/auth');

const app = express();
app.use(cors());

app.use(express.json());
const { PORT } = process.env;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((err) => {
    console.error(err);
  });

const usersRouter = require('./routes/users');

const cardsRouter = require('./routes/cards');
const { login } = require('./controllers/users');
const { createUser } = require('./controllers/users');

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);
app.use(auth);
app.use(logger);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use(errorLogger);
app.use(errors());
app.use((req, res) => {
  res.status(404).send({ message: 'Solicitação não encontrada' });
});

app.use(errorHandler);
