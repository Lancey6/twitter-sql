var express = require('express'); 
var swig = require('swig');

var app = express(); 

// app configuration
app.engine( 'html', swig.renderFile );        // render html using swig.renderFile
app.set( 'view engine', 'html' );             // use html as default view engine
app.set( 'views', process.cwd() + '/views' ); // render templates from our views folder

swig.setDefaults( { cache: false } );         // disable swig caching

// start app
app.listen(3000, function() {
	console.log('Listening on port 3000'); 
})

//Log incoming requests
app.use('/', function(req, res, next) {
	process.stdout.write(req.method + ' ' + req.path); 
	res.on('finish', function(){
		process.stdout.write(' ' + res.statusCode.toString() + '\n');

	})
	next(); 
})

// root route /
app.get('/', function(req, res) {
  var people = [{name: 'Full'}, {name: 'Stacker'}];

  res.render( 'index', {title: 'Hall of Fame', people: people} );
})

