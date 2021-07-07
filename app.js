const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layouts')
//mongoose
mongoose.connect('mongodb+srv://<USERNAME>:<PASSWORD>@ppsaccountinfocluster.uisvs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('Connected to Cluster'))
.catch((err)=> console.log(err));
//EJS
app.set('view engine','ejs');
app.use(expressEjsLayout);
//BodyParser
app.use(express.urlencoded({extended : false}));

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

app.listen(3000, () => {
    console.log('Listening on Port 3000')
});