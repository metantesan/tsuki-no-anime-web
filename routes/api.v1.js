var express = require('express');
const { v4: uuid } = require('uuid');
var router = express.Router();
const downloader = require('../modules/filedownloader');
const { convert } = require('../modules/maldata');
const mal = require('mal-scraper');
/* GET users listing. */
router.get('/:id', async (req, res, next) => {
   var s = 'https://myanimelist.net/anime/' + req.params.id
   var m = await mal.getInfoFromURL(s)
   var c = convert(m)
   var fname = uuid().replaceAll("-","") + ".jpg";
  await downloader(c.thumbnail,fname)
  c.thumbnail="http://127.0.0.1:9000/ani/"+fname
   res.json(c)
});
module.exports = router;
