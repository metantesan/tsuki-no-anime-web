const express = require('express')
const path = require('path')
const layout = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser');
const { connect ,conn } = require('./config/db');
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require("connect-mongo")
const mong=new MongoStore({mongoUrl:"mongodb://127.0.0.1:27017/",dbName:"tsuki"})
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.set('layout', 'viewslayout')
app.use(layout)
app.use(require("./modules/setheader"))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(
    session({
        secret: "nnnn",
        resave: false,
        saveUninitialized: false,
        unset: "destroy",
        store: mong,
        cookie: { maxAge: 24 * 60 * 60 * 1000 },
    })
);
app.use('/', require('./routes/index'))
app.use('/dashbord', require('./routes/dashbord'))
app.use("/anime", require('./routes/anime'))
app.use('/api/v1',require('./routes/api.v1'))
app.get('*', (req, res) => {
    res.sendStatus(404)
})
var port=9000;
app.listen(port, () => {


console.log(`
starting app
app runing in port ${port}
app url : http://127.0.0.1:${port}
`)
 
   connect()
});