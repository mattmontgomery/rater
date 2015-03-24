var argv = require('minimist')(process.argv.slice(2));
var express = require('express');
var logger = require('morgan');

var waitSecs = argv.waitSecs || 0;
var port = argv.port || process.env.APP_PORT || 3000;

function startServerListen(){
    console.log('Starting server');
    var app = express();
    var bodyParser = require('body-parser');
    app.use(bodyParser.json()); // for parsing application/json
    
    var ApiRouter = require('../src/api');
    app.use(logger('dev'));
    app.use('/static',express.static(__dirname + '/../dist'));
    app.use('/api', ApiRouter);
    var server = app.listen(port, function() {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Listening at http://%s:%s', host, port);
    });
};

if(waitSecs > 0)
{
    console.log("Detected --waitSecs=" + waitSecs + ", starting wait...");
}
setTimeout(startServerListen, waitSecs * 1000);
