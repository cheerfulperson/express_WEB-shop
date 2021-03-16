const express = require('express');

const router = express.Router();

router.get('/smartphones-and-accessories/mobile-phones', (req, res, next) =>{
    res.render('layouts/categories-listWithProducts');
})



module.exports = router;