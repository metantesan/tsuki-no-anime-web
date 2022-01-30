var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/index',{
    layout:"layout/dashbord"
  })
});
router.get('/login', function(req, res, next) {
  res.render('admin/login',{
    layout:"layout/dashbord",
    url:req.baseUrl+req.url,
  })
});
router.post('/login', function(req, res, next) {
  req.session.name="mps"
  res.redirect("/")
})
module.exports = router;
