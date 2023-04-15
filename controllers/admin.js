const Product = require("../models/product");

exports.getAddProduct = (req, res) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product({ title: title, price: price, description: description, imageUrl: imageUrl });
    product
        .save()
        .then(result => {
            console.log('Created Product');
            res.redirect('/admin/add-product')
        }).catch(err => console.log(err));
}

exports.getEditProduct = (req, res) => {
    const editMode = req.query.edit;
    if(!editMode) { return res.redirect('/'); }

    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if(!product) return res.redirect('/');
            res.render('admin/edit-product', { product:product, pageTitle: product.title, path:'/admin/edit-product', editing: editMode });
        })
        .catch(err => console.log(err));
}

exports.postEditProduct = (req, res) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    const product = new Product(updatedTitle, updatedPrice, updatedDesc, updatedImageUrl, prodId);
    product
        .save()
        .then(result => {
            console.log('Updated Product');
            res.redirect('/admin/products');
        }).catch(err => console.log(err));

}

exports.postDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId)
        .then(result => {
            console.log('Product Deleted');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}

exports.getProducts = (req, res) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => console.log(err));
}