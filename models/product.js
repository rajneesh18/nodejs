const db = require('../util/db');

const Cart = require('./cart');

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {

    }

    static deleteById(id) {
        return db.execute(`delete from products where id = ${id}`);
    }

    static fetchAll() {
        return db.execute('Select * from products');
    }

    static findById(id) {
        return db.execute(`select * from products where id = ${id} limit 1`);
    }
}