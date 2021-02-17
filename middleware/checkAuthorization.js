module.exports = (req, res, next) => {
    try {
        const status = req.session.user;

        console.log(status)
        if (status === undefined) {
            next()
        } else {
        res.render('error')
        }
    } catch (e) {
        console.log(e)
        res.render('error')
    }

}