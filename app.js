let express = require('express');
let router = express.Router();
let path = require('path')
let app = express();
let mongoose = require('mongoose');
let expressEjsLayout = require('express-ejs-layouts')
let session = require('express-session');
let flash = require('connect-flash');
require('dotenv').config();
let passport = require('passport');
require("./config/passport")(passport)

//mongoose
mongoose.connect(
'mongodb+srv://chrisjk868:jellyboard@ppsaccountinfocluster.uisvs.mongodb.net/myFirstDatabase?retryWrites=true', //process.env.URI,
{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('Connected to Cluster'))
.catch((err)=> console.log(err));

//EJS
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));

//BodyParser
app.use(express.urlencoded({extended : false}));

//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
next();
})

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening to Port')
});