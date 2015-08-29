var path = require('path');
var express = require('express');
var app = express();

var indexPath = path.resolve(__dirname, 'client', 'index.html');

app.use(express.static('build'));

app.get('/', function(req, res) {
    res.sendFile(indexPath);
});

app.listen(8000, function() {
    console.log('App is listening on port 8000.');
});
