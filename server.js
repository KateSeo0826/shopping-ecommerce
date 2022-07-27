const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const MongoStore = require('connect-mongo')(session);
// Require handlebars and just-handlebars-helpers
const Handlebars = require('handlebars');
const H = require('just-handlebars-helpers');

// Register just-handlebars-helpers with handlebars
H.registerHelpers(Handlebars);
//load the environment variable file
require('dotenv').config({ path: "./config/keys.env" });

//load controllers
const generalController = require("./controllers/general");
const productController = require("./controllers/productAdd");

//creation of app object
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


//express static middleware
app.use(express.static('public'));
app.use(express.static("public/img"));


//Handlebars middleware(This tells Express to set handlebars as the template engine)
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use((req, res, next) => {
    if (req.query.method == "PUT") {
        req.method = "PUT"
    }

    else if (req.query.method == "DELETE") {
        req.method = "DELETE"
    }
    next();
})


app.use(fileUpload());

app.use(session({
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: true,
    // store: new MongoStore({ mongooseConnection: mongoose.MONGO_DB_CONNECTION_STRING }),
    cookie: { maxAge: 180 * 60 * 1000 }
}))

app.use((req, res, next) => {
    res.locals.user = req.session.userInfo;
    next();
})

//map each controller to the app object
app.use("/", generalController);
app.use("/", productController);



//mongoose
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connected to MongoDB Database`);
    })
    .catch(err => console.log(`Error occurred when connection to database ${err}`));

//sets up server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Web Server is up and running');
});