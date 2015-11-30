var express = require('express');
var port = process.env.PORT || 4567;
var app = express();

app.use('/', express.static(__dirname + '/public/'));

app.get('/', function(request, response) {
    response.sendfile(__dirname + '/public/index.html');
});

app.get('/nordhouse', function(request, response) {
    response.sendfile(__dirname + '/public/nordhouse.html');
});

app.get('/flying-trash', function(request, response) {
    response.sendfile(__dirname + '/public/flying-trash.html');
});

app.get('/to-do', function(request, response) {
    response.sendfile(__dirname + '/public/to-do.html');
});

app.get('/nice-tat', function(request, response) {
    response.sendfile(__dirname + '/public/nice-tat.html');
});

app.get('/autobiographic-fanfiction', function(request, response) {
    response.sendfile(__dirname + '/public/autobiographic-fanfiction.html');
})

app.listen(port);
