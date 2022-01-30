var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id/:slug', function(req, res, next) {
    // res.render('index', { layout: 'layout/main', titel:"| home" });
    res.json(req.params)
});

module.exports = router;