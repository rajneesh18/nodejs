const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require("./controllers/error");
const sequelize = require('./util/db');
const Product = require('./models/product');
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
    User.findByPk(1).then(user => {
        req.user = user;
        next();
    }).catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

const server = http.createServer(app);
sequelize
    .sync()
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if(!user) {
            return User.create({
                name: 'Max',
                email: 'test@test.com'
            });
        }
        return user;
    })
    .then(user => {
        // console.log(user);
        server.listen(3000);
    })
    .catch(err => console.log(err));
