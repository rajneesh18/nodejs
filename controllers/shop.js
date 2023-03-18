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
            res.render('shop/product-detail', { product: rowss, pageTitle: product.title, path:'/products' });
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
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products) {
                const cartProductsData = cart.products.find(prod => prod.id === product.id);
                if(cartProductsData) {
                    cartProducts.push({ productData: product, qty: cartProductsData.qty});
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            });
        });
    });
}

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        // Update my cart
        Cart.addProduct(prodId, product.price);
    });

    res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
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