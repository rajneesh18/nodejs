const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    // path: is a node core module which will import using the require method
    // & we create a path with the help of this module by calling the join() method and passing the link in it
    // __dirname: A global variable which provide the path on our operation system to this project folder
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;