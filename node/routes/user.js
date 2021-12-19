var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Order = require('../models/orders');
var Cart=require('../models/cart');

var csrfProtection = csrf();
router.use(csrfProtection);

/*Get profile*/
router.get('/profile',isLoggedIn,function (req,res,next) {
    Order.find({user: req.user},function (err,orders) {
if(err){
    return res.write('Error!');
}
var cart;
orders.forEach(function (order) {
    cart=new Cart(order.cart);
    order.items=cart.generateArray();

});


res.render('user/profile', {orders: orders, user: req.user});


    });
});

router.get('/logout',isLoggedIn,function (req,res,next) {
    req.logout();
    res.redirect('/');
});


router.use('/',notLoggedIn, function (req,res,next)
{
next();
});


router.get('/signup', function(req, res, next){
    var messages= req.flash('error');
    res.render('user/signup',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length >0});
});

router.post('/signup',passport.authenticate('local.signup',{
    failureRedirect: '/user/signup',
    failureFlash: true

}),function (req,res,next) {
    if(req.session.oldurl){
        var oldurl=req.session.oldurl;
        req.session.oldurl=null;
        res.redirect(oldurl);
    }else {
        res.redirect('/user/profile');
    }

});

router.get('/signin', function(req, res, next){
    var messages= req.flash('error');
    res.render('user/signin',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length >0});
});


router.post('/signin',passport.authenticate('local.signin',{
    failureRedirect: '/user/signin',
    failureFlash: true

}),function (req,res,next) {
    if(req.session.oldurl){
        var oldurl=req.session.oldurl;
        req.session.oldurl=null;
        res.redirect(oldurl);
    }else {
        res.redirect('/user/profile');
    }

});




module.exports = router;

function isLoggedIn(req,res,next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req,res,next) {
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}