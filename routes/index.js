var express = require('express');
var router = express.Router();
var request = require('request');
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

      $('img').each(function () {
        console.log($(this).attr('src'));
      });
    }
  });


  res.status(200).json({message: 'OK'});
});

function parseHTML(str) {
  return cheerio.load(str);
}

module.exports = router;
