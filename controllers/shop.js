const Product = require('../models/product');

exports.getProducts = (req, res) => {
    Product
        .find()
        .then(products => {
            console.log(products);
            res.render('shop/product-list', { prods: products, pageTitle: 'All Products', path:'/products' });
        })
        .catch(err => console.log(err))
}

exports.getProduct = (req, res) => {
    const prodID = req.params.productId;
    Product.findById(prodID)
        .then(product => {
            res.render('shop/product-detail', { product: product, pageTitle: product.title, path:'/products' });
        })
        .catch(err => console.log(err));
}

exports.getIndex = (req, res) => {
    Product
        .find()
        .then(products => {
            res.render('shop/index', { prods: products, pageTitle: 'Shop', path:'/' });
        })
        .catch(err => console.log(err));
}

exports.getCart = (req, res) => {
    req.user
        .populate('cart.items.productId')
        .then(user => {
            const products = user.cart.items;
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            });
        }).catch(err => console.log(err));
}

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log(result, 'cart');
            res.redirect('/cart');
        })
        .catch(err => console.log(err));

}

exports.postCartDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    req.user
        .removeFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}

exports.postOrder = (req, res) => {
    let fetchedCart;
    req.user
        .addOrder()
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
}

exports.getOrders = (req, res) => {
    req.user
        .getOrders()
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            });
        })
        .catch(err => console.log(err));
}