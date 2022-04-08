var express = require('express');
var router = express.Router();
const {convert} = require('../modules/maldata');
const mal = require('mal-scraper');
/* GET users listing. */
router.get('/:id',async (req, res, next)=>{
   var s= 'https://myanimelist.net/anime/'+req.params.id
   var m=await mal.getInfoFromURL(s)
   res.json(convert(m))
});
module.exports = router;
