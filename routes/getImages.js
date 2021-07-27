const crearError = require('http-errors'),
    router = require('express').Router(),
    { join } = require('path');

router.get('/avatar/:fileName', (req, res, next) => {
    let fileName = req.params['fileName'];
    let type = 'image/' + fileName.split('.')[1];
    var image = join(__dirname, '..', 'public', 'data', 'images', 'avatars', fileName)
    try {
        if (fileName)
            res.contentType(type).sendFile(image)
        else next(crearError(404))
    } catch (error) {
        console.error(error)
        next(crearError(error))
    }
})

module.exports = router;