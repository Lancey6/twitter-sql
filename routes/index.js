var db = require('../models/index');
var express = require('express');
var fs = require('fs');
var router = express.Router();
//var tweetBank = require('../tweetBank');
var bodyParser = require('body-parser');


module.exports = function(io) {
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json()); 

  router.get('/', function( req, res, next ) {
    //var tweets = tweetBank.list();
    db.Tweet.findAll({ include: db.User }).then( function( tweets ) {
      res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
    } );
  } );

  router.get('/users/:name', function( req, res, next ) {
    var name = req.params.name;
    //var list = tweetBank.find( {name: name} );
    //db.Tweet.findAll({ include: db.User, where:{ 
    db.User.findOne({ where:{ name:name } }).then( function( user ) {
      return user.getTweets({ include: db.User });
    }).then( function( tweets ) {
      res.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets:tweets, showForm: true, userName: name } );
    });
  } );

  router.get('/users/:name/tweets/:id', function( req, res, next ) {
    var name = req.params.name;
    var id = parseInt( req.params.id );
    //var list = tweetBank.find( {id: id} );
    db.Tweet.findOne({ where:{ id:id }, include:db.User }).then( function( tweet ) {
      res.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets: [tweet] } );
    } );
  } );

  // ******************** We're up to here *****************************
  router.post('/submit', function(req, res, next) {
    var name = req.body.name; 
    var text = req.body.text; 
    //tweetBank.add(name, text); 
    //var id = tweetBank.list().length - 1; 
    var id = 0;
    io.sockets.emit('new_tweet', { name: name, text: text, id: id });
    res.redirect('/');
  })

  router.use('/', function( req, res, next ) {
    fs.readFile( process.cwd() + '/public' + req.path, 'utf8', function( err, data ) {
      if ( err ) {
        res.status(404).send( { error: 'File not found' } );
        return console.error( err );
      }

      res.type( 'css' );
      res.send( data );
    } );
  } );

  // Old export, prior to wrapping everything in a function
  // module.exports = router;

  return router; 
};
