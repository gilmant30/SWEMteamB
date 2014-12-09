/**
 * HomeController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  index: function(req, res) {
    res.view('home/index');
  },

  info: function(req, res) {
    res.view('home/info');
  },

  test: function(req, res) {
  var https = require('https');

    var options = {
      hostname: 'api.twitter.com/1.1',
      port: 443,
      path: '/1.1/search/tweets.json?q=%40twitterapi',
      method: 'GET',
      headers: {'Authorization': req.user}
    };

  https.request(options, function(response) {
    var responseData = '';
    response.setEncoding('utf8');

    response.on('data', function(chunk){
      responseData += chunk;
    });

    response.once('error', function(err){
      // Some error handling here, e.g.:
      res.serverError(err);
    });

    response.on('end', function(){
      try {
        // response available as `responseData` in `yourview`
        res.locals.requestData = JSON.parse(responseData);
      } catch (e) {
        sails.log.warn('Could not parse response from options.hostname: ' + e);
      }

      res.send();
    });
  }).end();

  },

  show: function(req, res) {
    res.view('home/show');
  },

  testzip: function(req, res) {
    var http = require('http');
    var zipcode = '63131'
  //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
  var options = {
    host: 'maps.google.com',
    path: '/maps/api/geocode/json?components=country%3aUSA%7Cpostal_code:' + zipcode
  };

  callback = function(response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      res.send(str);
    });
  }

  http.request(options, callback).end();
  },

  test2: function(req, res) {
    var Twit = require('twit')

    var T = new Twit({
        consumer_key:         'KLITOBzNQpG9lpc67ES8a921P'
      , consumer_secret:      'lXy5qrwjJX01Lrg7Wpf3YS3gz6nnBuDpMbgWrZIw1i8xojpiDX'
      , access_token:         '1447262809-3zR7HCZpACHwp0h4vWZ4iDI4bzeVBIBFXcEai9d'
      , access_token_secret:  'TAH7f49iEgOArhuqV3ipOe66humKpQFMywMptubk5B0vc'
    })
  

  T.get('search/tweets', { q: 'banana geocode:37.781157,-122.398720,100mi', count: 100 }, function(err, data, response) {
    res.send(data);
  })

  
  }
};