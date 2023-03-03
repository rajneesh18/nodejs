const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const rootDir = require('./util/path');

const app = express();

/** express-handlebars are not build in, it's from 3rd party package, we have to first install it & then use it with method engine() */
app.engine('hbs', expressHbs.engine({
    extname: "hbs",
    layoutsDir: 'views/layouts',
    defaultLayout: 'main-layout'
}));

app.set('view engine', 'hbs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopData = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminData.routes);
app.use(shopData);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

const server = http.createServer(app);
server.listen(3000);