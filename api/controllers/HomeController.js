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

  senddata: function(req, res) {
    res.view("home/senddata");
  },

  getdata: function(req, res) {
    var zipcode = req.param("zipcode");
    var http = require('http');
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
      obj = JSON.parse(str)
      var results = obj.results[0].geometry.location;
      //res.send(results);
      var Twit = require('twit')

      var T = new Twit({
          consumer_key:         'KLITOBzNQpG9lpc67ES8a921P'
        , consumer_secret:      'lXy5qrwjJX01Lrg7Wpf3YS3gz6nnBuDpMbgWrZIw1i8xojpiDX'
        , access_token:         '1447262809-3zR7HCZpACHwp0h4vWZ4iDI4bzeVBIBFXcEai9d'
        , access_token_secret:  'TAH7f49iEgOArhuqV3ipOe66humKpQFMywMptubk5B0vc'
      })
    

    T.get('search/tweets', { q: 'banana geocode:'+results.lat+','+results.lng+',10mi', count: 100 }, function(err, data, response) {
      res.send(data);
    })
    });
  }

  http.request(options, callback).end();
    
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
      obj = JSON.parse(str)
      var results = obj.results[0].geometry.location;
      res.send(results);
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