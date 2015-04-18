var express = require('express');
var router = express.Router();
var request = require('request');
var uuid = require('uuid');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/downloads', function(req, res, next) {


  request(req.body.url, function (error, response, body) {
    console.log(error);
    if (!error && response.statusCode == 200) {
      console.log(body); // Show the HTML for the Google homepage.
      var $ = parseHTML(body);


      var images = [];
      $('img').each(function () {
        images.push({
          src: $(this).attr('src'),
          uuid: uuid.v4()
        });
      });

      res.status(200).json({message: 'OK', images: images});
    }
  });



});

function parseHTML(str) {
  return cheerio.load(str);
}

module.exports = router;
