const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require("./controllers/error");
const User = require('./models/user');

const rootDir = require('./util/path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
    User.findById('64292e06d78878c4f23a6fce')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        }).catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

mongoose
    .connect('mongodb+srv://rkshukla:N9wMbEkj46DqwicN@cluster0.9zjumcl.mongodb.net/shop?retryWrites=true&w=majority')
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        err => console.log(err);
    });
