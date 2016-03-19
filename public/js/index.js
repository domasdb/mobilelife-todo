var React = require('react');
var Todos = require('../../views/index.jsx');
var request = require('request');
var Url = require('url');

/*request({
    method: 'POST',
    url: Url.resolve(window.location.href, '/list'),
    json: true 
}, function(error, response, body) { 
    React.render(<Todos todos={body} />, document.getElementById('container'));
});*/ 

React.render(<Todos />, document.getElementById('container'));