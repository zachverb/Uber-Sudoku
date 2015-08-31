'use strict';

var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var indexPath = path.resolve(__dirname, 'client', 'index.html');

app.use(express.static('build'));

app.get('/', function(req, res) {
    res.sendFile(indexPath);
});

app.listen(port, function() {
    console.log('App is listening on port 8000.');
});
