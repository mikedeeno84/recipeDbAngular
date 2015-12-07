var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/browser'));



app.get("/", function (req, res, next){
    res.sendFile(path.join(__dirname, "public/views/index.html"))
})
// app.use('/api', require('./routes'));

// custom error handling to remove stack trace
app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});

app.get('/*', function (req, res) {
    res.sendFile(app.get('indexHTMLPath'));
});

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(3001, function() {
    console.log("server listening on port 3001..");
});
module.exports = app;
