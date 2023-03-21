const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res) => {
    Product
        .findAll()
        .then(products => {
            res.render('shop/product-list', { prods: products, pageTitle: 'All Products', path:'/products' });
        })
        .catch(err => console.log(err))
}

exports.getProduct = (req, res) => {
    const prodID = req.params.productId;
    Product.findByPk(prodID)
        .then(product => {
            res.render('shop/product-detail', { product: product, pageTitle: product.title, path:'/products' });
        })
        .catch(err => console.log(err));
}

exports.getIndex = (req, res) => {
    Product
        .findAll()
        .then(products => {
            res.render('shop/index', { prods: products, pageTitle: 'Shop', path:'/' });
        })
        .catch(err => console.log(err));
}

exports.getCart = (req, res) => {
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts().then(products => {
                console.log(products);
                res.render('shop/cart', {
                    path: '/cart',
                    pageTitle: 'Your Cart',
                    products: products
                });
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
}

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    let fetchedCart;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({where: {id: prodId}});
        })
        .then(products => {
            let product;
            if(products.length > 0) {
                product = products[0];
            }
            let newQty = 1;
            if(product) {
                // ....
            }
            return Product.findByPk(prodId).then(product => {
                return fetchedCart.addProduct(product, { through: { quantity: newQty } });
            }).catch(err => console.log(err));
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}

exports.postCartDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then(product => {
            Cart.deleteProduct(prodId, product.price);
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}

exports.getOrders = (req, res) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
}

exports.getCheckout = (req, res) => {
    res.render('/shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
}