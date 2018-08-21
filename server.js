console.log('server.js works');

// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();

var session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/client/public/dist/public"));

// Integrate body-parser with our App
app.use(bodyParser.json());

const flash = require('express-flash');
app.use(flash());

const bcrypt = require('bcryptjs');

require('./server/config/mongoose.js')();
// Routes
require('./server/config/routes.js')(app)

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./client/public/dist/public/index.html"))
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})