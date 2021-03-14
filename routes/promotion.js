const express = require('express');
const db = require('../modules/DB-config');

const router = express.Router();

router.get('/',(req,res,next)=>{
    if (!req.body) return res.sendStatus(400);



    console.log('Promotion started...')
    res.render('layouts/promotion')
})

module.exports = router;
