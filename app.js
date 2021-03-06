var express = require('express');
var browserify = require('browserify');
var routes = require('./routes/index');
var bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', routes); 
app.use(express.static(__dirname + '/public'));
app.use('/index.js', function(req, res) {
   res.setHeader('Content-Type', 'application/javascript');
   browserify('./public/js/index.js', { debug: true }).transform('reactify').bundle().pipe(res);
});

var server = app.listen(8888, function() {
    var addr = server.address();
    console.log('Listening @ http://%s:%d', addr.address, addr.port);
});