const createError = require('http-errors');

module.exports = (req, res, next) => {
        const status = req.session.user;
        if (status === undefined) next()
        else next(createError(404)) //Просто создал обработчик который отправляет ошибку 404
}