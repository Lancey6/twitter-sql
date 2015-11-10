var express = require('express');
var fs = require('fs');
var router = express.Router();
var tweetBank = require('../tweetBank');

router.get('/', function( req, res, next ) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
} );

router.use('/', function( req, res, next ) {
  fs.readFile( process.cwd() + '/public' + req.path, 'utf8', function( err, data ) {
    if ( err ) {
      res.status(404).send( { error: 'File not found' } );
      return console.error( err );
    }

    res.send( data );
  } );
} );

module.exports = router;
