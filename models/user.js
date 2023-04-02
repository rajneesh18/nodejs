const mongodb = require('mongodb');
const getDb = require('../util/db').getDb();

const ObjectId = mongodb.ObjectId;
const db = getDb();

class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
    }

    save() {
        return db
            .collection('users')
            .insertOne(this);
    }

    static findById(userId) {
        return db
            .collection('users')
            .findOne({ _id: new ObjectId(userId) })
            .then(user => {
                console.log(user);
                return user;
            })
            .catch(err => cosole.log(err));
    }
}

module.exports = User;
