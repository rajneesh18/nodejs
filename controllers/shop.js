const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/product-list', { prods: rows, pageTitle: 'All Products', path:'/products' });
        })
        .catch(err => console.log(err));
}

exports.getProduct = (req, res) => {
    const prodID = req.params.productId;
    Product.findById(prodID)
        .then(([rows, fieldData]) => {
            res.render('shop/product-detail', { product: rows[0], pageTitle: rows[0].title, path:'/products' });
        })
        .catch(err => console.log(err));
}

exports.getIndex = (req, res) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/index', { prods: rows, pageTitle: 'Shop', path:'/' });
        })
        .catch(err => console.log(err));
}

exports.getCart = (req, res) => {
    Cart.getCart(cart => {
        Product.fetchAll()
            .then(([products]) => {

                const cartProducts = [];
                for(product of products) {
                    const cartProductsData = cart.products.find(prod => { return prod.id == product.id });
                    if(cartProductsData) {
                        cartProducts.push({ productData: product, qty: cartProductsData.qty});
                    }
                }
                res.render('shop/cart', {
                    path: '/cart',
                    pageTitle: 'Your Cart',
                    products: cartProducts
                });
            })
            .catch(err => console.log(err));
    });
}

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(([product]) => {
            Cart.addProduct(prodId, product[0].price);
        })
        .catch(err => console.log(err));

    res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(([product]) => {
            Cart.deleteProduct(prodId, product[0].price);
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