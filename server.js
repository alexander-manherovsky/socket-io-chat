const express = require('express');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongooseConnection = require("./db/dbconnect").connection;
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(
    session({
        secret: "sessionsecretsessionsecret",
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
            mongooseConnection: mongooseConnection
        })
    })
);

const staticPath = path.normalize(__dirname + "/public");
app.use(express.static(staticPath));

app.get('/', function (req, res) {
    res.sendFile(__dirname + 'index.html');
});
app.get('/css/main.css', function (req, res) {
    res.sendFile(__dirname + 'css/main.css');
});
app.get('/js/main.js', function (req, res) {
    res.sendFile(__dirname + 'js/main.js');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/api/routes')(app);

const sever = app.listen(5000, () => {
    console.log('listening on *:5000');
});
