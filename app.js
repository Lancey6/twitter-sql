var express = require('express'); 
var app = express(); 

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

app.get('/', function(req, res) {
	res.send('test'); 
})

