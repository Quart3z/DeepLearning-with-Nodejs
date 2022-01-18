const path = require('path');
const express = require('express');
const app = express();

const train = require('./resources/js/train')

app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/resources/html/index.html'));
})

app.get('/train', function (req, res) {
    train.train(req.query.x, req.query.c, req.query.action).then(function (test) {
        // res.sendStatus(200)
        res.json({result: test})
    })

})

var server = app.listen(3000, function () {
    var host = "localhost"
    var port = "3000"

    console.log("Example app listening at http://%s:%s", host, port)
})