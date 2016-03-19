var express = require('express');
var browserify = require('browserify');
var routes = require('./routes/index');
var bodyParser = require('body-parser')

//var jsx = require('node-jsx');

var app = express();
//jsx.install();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//app.set('views', __dirname + '/views');

app.use('/', routes); 
app.use(express.static(__dirname + '/public'));
app.use('/index.js', function(req, res) {
   console.log('BUNDLE START');
   res.setHeader('Content-Type', 'application/javascript');
   browserify('./public/js/index.js', { debug: true }).transform('reactify').bundle().pipe(res);
   console.log('BUNDLE END');
});

var server = app.listen(8888, function() {
    var addr = server.address();
    console.log('Listening @ http://%s:%d', addr.address, addr.port);
});