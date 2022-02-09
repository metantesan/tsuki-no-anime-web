var express = require('express');
const anime = require('../model/anime');
const { getbystring } = require('../modules/getfileformat');
const { v4: uuidv4 } = require('uuid')
const fs = require('fs');
const path = require('path');
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
  return res.render('admin/anime/add', {
    layout: "layout/dashbord",
    url: req.baseUrl
  })
})
router.post('/anime/add', async (req, res) => {
  try {
    var { name, des, g } = req.body;
    var ag = String(g).split(',')
    var img = req.files.amg
    var img_name = uuidv4() + '.' + getbystring(img.name)
    var path_img = '.' + '/public/anime/' + img_name
    img.mv(path_img, err => {
      if (err)
        console.log(err);
    })
    var ani = {
      img_name: img_name,
      titel: name,
      description: des,
      genres: ag,
    }

    await anime.create(ani)

    return res.redirect(`${req.baseUrl}/anime`)
  }
  catch (err) {
    res.statusCode = 504;
    return res.render('error/5xx', {
      layout: "layout/dashbord",
      url: req.baseUrl + req.url,
      err
    })
  }
})
router.get('/anime/edit/:id', async (req, res) => {
  try {
    var { id } = req.params
    var ani = await anime.findById(id)
    return res.render('admin/anime/edit', {
      layout: "layout/dashbord",
      url: req.baseUrl + req.url,
      anime: ani
    })
  }
  catch (err) {
    res.statusCode = 504;
    return res.render('error/5xx', {
      layout: "layout/dashbord",
      url: req.baseUrl + req.url,
      err
    })
  }
})
router.post('/anime/edit/:id', async (req, res) => {
  try {
    var { id } = req.params
    var { titel, description, genres, _id } = req.body
    genres = String(genres).split(',')
   
    if (id != _id)
    {
      res.statusCode=401
      return res.render("error/4xx",{
        layout: "layout/dashbord",
        url: req.baseUrl + req.url,
        err:"bad request"
      })
    }
    if(req.files){
      var img=req.files.amg
      var ani = await anime.findById(req.params.id)
      fs.unlink('./public/anime/' + ani.img_name, err => {
        if (err)
          console.log(err);
      })
      var img_name = uuidv4() + '.' + getbystring(img.name)
      var path_img = '.' + '/public/anime/' + img_name
      img.mv(path_img, err => {
        if (err)
          console.log(err);
      })
      var up = {
        titel, description, genres,img_name
      }
    }
    else{
      var up = {
        titel, description, genres
      }
    }
    
    await anime.findByIdAndUpdate(_id, up)
    return res.redirect(`${req.baseUrl}/anime`)
  }
  catch (err) {
    res.statusCode = 504;
    return res.render('error/5xx', {
      layout: "layout/dashbord",
      url: req.baseUrl + req.url,
      err
    })
  }
})
router.get('/anime/delete/:id', async (req, res) => {
  try {
    var ani = await anime.findById(req.params.id)
    fs.unlink('./public/anime/' + ani.img_name, err => {
      if (err)
        console.log(err);
    })
    await anime.findByIdAndRemove(req.params.id)
    // return res.redirect(`${req.baseUrl}/anime`)
    return res.send("ok")
  }
  catch (err) {
    // return res.redirect(`${req.baseUrl}/anime`)
    return res.send("err")
  }
})
module.exports = router;
