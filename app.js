var chalk = require('chalk');
var express = require('express'); 
var swig = require('swig');

var routes = require('./routes/' );
var socketio = require('socket.io'); 

var app = express(); 

// app configuration
app.engine( 'html', swig.renderFile );        // render html using swig.renderFile
app.set( 'view engine', 'html' );             // use html as default view engine
app.set( 'views', process.cwd() + '/views' ); // render templates from our views folder

swig.setDefaults( { cache: false } );         // disable swig caching

// start app
var server = app.listen(3000, function() {
	console.log('Listening on port 3000'); 
})
var io = socketio.listen(server); 

//Log incoming requests
app.use('/', function(req, res, next) {
	res.on('finish', function(){
                console.log( chalk.green( req.method ), req.path, chalk.yellow( res.statusCode ) );

	})
	next(); 
});

//Old router
// app.use('/', routes);

var router = routes(io); 
app.use('/', router); 
