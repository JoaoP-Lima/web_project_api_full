const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find()
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (card.owner.equals(req.user._id)) {
        return Card.findByIdAndDelete(req.params.cardId).then((deleteCard) => {
          res.send(deleteCard);
        });
      }
      return res.status(403).send({ message: 'Não autorizado' });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: {
        likes: req.user._id,
      },
    },
    {
      new: true,
    },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: {
        likes: req.user._id,
      },
    },
    {
      new: true,
    },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch(next);
};
