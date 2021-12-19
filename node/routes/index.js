var express = require('express');
var router = express.Router();

var Cart =require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/orders');
var Contact =require('../models/contact');



const nodemailer = require("nodemailer");

var stripe= require('stripe')('pk_test_hSd6sfCAFsvHFkLvLx3EKkNO00crIKDOP7');



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('shop/index');
});




/*Add to cart router*/
router.get('/add-to-cart/:id', function (req,res,next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function (err, product) {
        if(err){
            return res.redirect('/shop/menu');
        }

        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/shop/menu');

    });

});

/*AddbyOne*/
router.get('/add/:id',function (req,res,next) {

    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.addByOne(productId);
    req.session.cart=cart;
    res.redirect('/shop/cart');
});

/*ReducebyOne*/
router.get('/reduce/:id',function (req,res,next) {

    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart=cart;
    res.redirect('/shop/cart');
});

/*RemoveAll*/
router.get('/remove/:id',function (req,res,next) {

    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeAll(productId);
    req.session.cart=cart;
    res.redirect('/shop/cart');
});



/* GET checkout page. */
router.get('/shop/checkout', isLoggedIn, function(req, res, next) {
    if(!req.session.cart){
        return res.redirect('/shop/cart');
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/checkout', { user: req.user,products: cart.generateArray(),total: cart.totalPrice, finalPrice: cart.totalPrice+120, chargeAmount: (cart.totalPrice+120)*100});


});



var c;
/*Card Payment Gateway*/
router.post('/charge', isLoggedIn, function (req,res) {
    var cart=new Cart(req.session.cart);
    c= req.session.cart;

    var token= req.body.stripeToken;
    var chargeAmount=req.body.chargeAmount;
    var charge=stripe.charges.create({
        amount: chargeAmount,
        currency: 'rupees',
        source: token
    }, function (err,charge) {
        if(err & err.type==="StripeCardError"){
            console.log("Card Declined");
            res.redirect('/shop/payfail');
        }
        var order= new Order({
            user:req.user,
            cart: cart,
            name: req.user.name

        });
        order.save(function (err, result) {
            if(err){
                console.log(err);
            }
            console.log("Payment Successful");

            req.session.cart=null;
            res.redirect('/shop/paysuccess');
        });

    });
    console.log(c);

    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: 'incrediblenerd2457@gmail.com',// generated ethereal user
            pass:' z1y2x3w4' // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = {
        from: 'incrediblenerd2457@gmail.com', // sender address
        to: req.user.email, // list of receivers
        subject: "Confirmation:",
        template:'/views/bills/bill',
        text: "ORDER HAS BEEN PLACED. IT WILL REACH YOUR ADDRESS IN 7 BUSINESS DAYS" // plain text body
    };
    transporter.sendMail(info,function(err,inf){
        if(err){
            console.log(err);
        }
        console.log('Email sent: '+info.response);

    });

});






/* GET contact page. */
router.get('/shop/contact', function(req, res, next) {
    res.render('shop/contact');
});

router.post('/shop/contact',function (req,res,next) {

    var contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    });
    contact.save(function (err,result) {
        if(err){
            console.log('Failed!');
            console.log(err);
        }

    });



    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: 'incrediblenerd2457@gmail.com', // generated ethereal user
            pass:' z1y2x3w4' // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = {
        from: req.body.email, // sender address
        to: "incrediblenerd2457@gmail.com", // list of receivers
        subject: "Contact Request:", // Subject line
        text: "Name: " +req.body.name+ "\n"+
            "Email: "+req.body.email+"\n"+"Message: "+req.body.message, // plain text body
    };
    transporter.sendMail(info,function(err,inf){
        if(err){
            console.log(err);
        }
        console.log('Email sent: '+info.response);
        res.render('shop/contact' , {message:'Email has been sent'});

    });


});




router.get('/r1/:id/:r1', function (req,res,next) {

    var productId= req.params.id;


    Product.findById(productId, function (err, product) {
        if(err){
            return res.redirect('/shop/menu');
        }


        product.total=((product.n*product.rating)+(1));
        product.n+=1;
        product.rating=product.total/product.n;

        product.save(function (err,result) {
            if(err){
                console.log('Failed!');
                console.log(err);
            }

        });

        console.log(req.params);
        res.redirect('/shop/menu');

    });


});

router.get('/r2/:id/:r2', function (req,res,next) {

    var productId= req.params.id;


    Product.findById(productId, function (err, product) {
        if(err){
            return res.redirect('/shop/menu');
        }

        product.total=((product.n*product.rating)+(2));
        product.n+=1;
        product.rating=product.total/product.n;

        product.save(function (err,result) {
            if(err){
                console.log('Failed!');
                console.log(err);
            }

        });

        console.log(req.params);
        res.redirect('/shop/menu');

    });


});

router.get('/r3/:id/:r3', function (req,res,next) {

    var productId= req.params.id;


    Product.findById(productId, function (err, product) {
        if(err){
            return res.redirect('/shop/menu');
        }
        product.total=((product.n*product.rating)+(3));
        product.n+=1;
        product.rating=product.total/product.n;

        product.save(function (err,result) {
            if(err){
                console.log('Failed!');
                console.log(err);
            }

        });

        console.log(req.params);
        res.redirect('/shop/menu');

    });


});

router.get('/r4/:id/:r4', function (req,res,next) {

    var productId= req.params.id;


    Product.findById(productId, function (err, product) {
        if(err){
            return res.redirect('/shop/menu');
        }

        product.total=((product.n*product.rating)+(4));
        product.n+=1;
        product.rating=product.total/product.n;

        product.save(function (err,result) {
            if(err){
                console.log('Failed!');
                console.log(err);
            }

        });

        console.log(req.params);
        res.redirect('/shop/menu');

    });


});

router.get('/r5/:id/:r5', function (req,res,next) {

    var productId= req.params.id;


    Product.findById(productId, function (err, product) {
        if(err){
            return res.redirect('/shop/menu');
        }

        product.total=((product.n*product.rating)+(5));
        product.n+=1;
        product.rating=product.total/product.n;

        product.save(function (err,result) {
            if(err){
                console.log('Failed!');
                console.log(err);
            }

        });

        console.log(req.params);
        res.redirect('/shop/menu');

    });


});









module.exports = router;


function isLoggedIn(req,res,next) {
    if (req.isAuthenticated()){
        return next();
    }
    req.session.oldurl=req.url;
    res.redirect('/user/signin');
}

