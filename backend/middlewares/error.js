module.exports = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Dados inválidos';
  }

  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Dados inválidos';
  }
  if (err.name === 'DocumentNotFoundError') {
    statusCode = 404;
    message = 'Recurso não encontrado';
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = 'O recurso já existe';
  }

  res.status(statusCode).send({
    message: statusCode === 500 ? 'Erro no servidor' : message,
  });
};
