var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
   
    res.render('index', {
        layout: 'layout/main',
        title: "| home",
        user:{username: req.session.name || "null" ,},
    });
});

module.exports = router;