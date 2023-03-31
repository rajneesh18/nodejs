const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
    MongoClient
        .connect('mongodb+srv://rkshukla:N9wMbEkj46DqwicN@cluster0.9zjumcl.mongodb.net/?retryWrites=true')
        .then(client => {
            console.log('Connected!');
            callback(client);
        })
        .catch(err => console.log(err));
}
module.exports = mongoConnect;