var express = require('express');
var router = express.Router();
var Cart =require('../models/cart');


var Product = require('../models/product');

/* GET about page. */
router.get('/about', function(req, res, next) {
        res.render('shop/about');
    });

router.get('/cart', function(req, res, next) {
    if(!req.session.cart){
        return res.render('shop/cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});





/* GET paysuccess page. */
router.get('/paysuccess', function(req, res, next) {
    res.render('shop/paysuccess');
});


/* GET payfail page. */
router.get('/payfail', function(req, res, next) {
    res.render('shop/payfail');
});


/* GET menu page. */
router.get('/menu', function(req, res, next) {
    Product.find(function (err,docs) {
        var productChunks = [];
        var chunksize=3;
        for(var i =0; i<docs.length;i+=chunksize)
        {
            productChunks.push(docs.slice(i, i + chunksize));
        }
        res.render('shop/menu', {title: 'Shopping Cart', products: productChunks});

    });

});






module.exports = router;
