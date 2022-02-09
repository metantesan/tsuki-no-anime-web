var express = require('express');
const anime = require('../model/anime');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('admin/index', {
    layout: "layout/dashbord"
  })
});
router.get('/login', function (req, res, next) {
  res.render('admin/login', {
    // layout: "layout/dashbord",
    url: req.baseUrl + req.url,
  })
});
router.post('/login', function (req, res, next) {
  req.session.name = "mps"
  res.redirect("/")
});
router.get('/anime', async (req, res) => {
  try {
    var anim = await anime.find();
    return res.render('admin/anime/index', {
      layout: "layout/dashbord",
      url: req.baseUrl,
      animes: anim
    })
  }
  catch (err) {
    return res.sendStatus(500).render('error/5xx', {
      url: req.baseUrl + req.url,
    })
  }

});
router.get('/anime/add', async (req, res) => {
  try {
    var ani = {
      img_name: "1.jpg",
      titel: "one piece",
      description: "درباره یک پسر کوچک",
      views: 5,
      genres: ["اکشن", "عاشقانه"],
    }
    await anime.create(ani)

    return res.redirect(`${req.baseUrl}/anime`)
  }
  catch (err) {
    return res.redirect(`/${req.baseUrl}/anime`)
  }
})
router.get('/anime/edit/:id', async (req, res) => {
  try {
    var { id } = req.params
    var ani = await anime.findById(id)
    return res.render('admin/anime/edit', {
      layout: "layout/dashbord",
      url: req.baseUrl + req.url,
      animes: anim
    })
  }
  catch (err) {

  }
})
router.get('/anime/delete/:id', async (req, res) => {
  try {
    await anime.findByIdAndRemove(req.params.id)
    return res.redirect(`${req.baseUrl}/anime`)
  }
  catch (err) {
    return res.redirect(`/${req.baseUrl}/anime`)
  }
})
module.exports = router;
