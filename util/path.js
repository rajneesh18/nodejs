const path = require('path');

// process.mainModule.filename: get the path of root folder
module.exports = path.dirname(process.mainModule.filename);