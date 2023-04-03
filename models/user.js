const mongodb = require('mongodb');
const getDb = require('../util/db').getDb;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart; // {items: []}
        this._id = id;
    }

    save() {
        const db = getDb();
        return db
            .collection('users')
            .insertOne(this);
    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });
        let newQty = 1;
        const updatedCartItems = [...this.cart.items];

        if(cartProductIndex >= 0) {
            newQty = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQty;
        } else {
            updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQty })
        }

        const updatedCart = { items: updatedCartItems }
        const db = getDb();
        return db
            .collection('users')
            .updateOne({_id: new ObjectId(this._id)}, { $set: { cart: updatedCart } });

    }

    static findById(userId) {
        const db = getDb();
        return db
            .collection('users')
            .findOne({ _id: new ObjectId(userId) })
            .then(user => {
                return user;
            })
            .catch(err => cosole.log(err));
    }
}

module.exports = User;
