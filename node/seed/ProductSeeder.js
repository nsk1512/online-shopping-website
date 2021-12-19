var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shop',{useNewUrlParser: true, useUnifiedTopology: true});


var products = [
    new Product({
        imagePath: '/images/image_4.jpg',
        title: 'Ripped Jeans',
        price: 750,
        type: 1,
        r1: 1,
        r2: 2,
        r3: 3,
        r4: 4,
        r5: 5,
        n:0,
        rating:0,
        total:0
    }),
    new Product({
        imagePath: '/images/product-1.jpg',
        title: 'White Sheath Dress',
        price: 1000,
        type: 1,
        r1: 1,
        r2: 2,
        r3: 3,
        r4: 4,
        r5: 5,
        n:0,
        rating:0,
        total:0
    }),
    new Product({
        imagePath: '/images/product-2.jpg',
        title: 'Grey Casuals',
        price: 800,
        type: 1,
        r1: 1,
        r2: 2,
        r3: 3,
        r4: 4,
        r5: 5,
        n:0,
        rating:0,
        total:0

    }),


    new Product({
        imagePath: '/images/product-3.jpg',
        title: 'Florals',
        price: 1200,
        type: 1,
        r1: 1,
        r2: 2,
        r3: 3,
        r4: 4,
        r5: 5,
        n:0,
        rating:0,
        total:0

    }),
    new Product({
        imagePath: '/images/product-4.jpg',
        title: 'Florals Sleeveless',
        price: 800,
        type: 1,
        r1: 1,
        r2: 2,
        r3: 3,
        r4: 4,
        r5: 5,
        n:0,
        rating:0,
        total:0

    }),
    new Product({
        imagePath: '/images/product-5.jpg',
        title: 'Orange Slush',
        price: 650,
        type: 1,
        r1: 1,
        r2: 2,
        r3: 3,
        r4: 4,
        r5: 5,
        n:0,
        rating:0,
        total:0

    }),
    new Product({
        imagePath: '/images/product-6.jpg',
        title: 'Red wine gown',
        price: 3000,
        type: 1,
        r1: 1,
        r2: 2,
        r3: 3,
        r4: 4,
        r5: 5,
        n:0,
        rating:0,
        total:0

    }),
    new Product({
        imagePath: '/images/bg_2.jpg',
        title: 'Tank Top + Hat',
        price: 699,
        type: 1,
        r1: 1,
        r2: 2,
        r3: 3,
        r4: 4,
        r5: 5,
        n:0,
        rating:0,
        total:0

    }),


    new Product({
        imagePath: '/images/product-7.jpg',
        title: 'Black Bodycon Dress',
        price: 1500,
        type: 1,
        r1: 1,
        r2: 2,
        r3: 3,
        r4: 4,
        r5: 5,
        n:0,
        rating:0,
        total:0

    }),
    new Product({
        imagePath: '/images/person_1.jpg',
        title: 'Polo Ralph Lauren',
        price: 2799,
        type: 1,
        r1: 1,
        r2: 2,
        r3: 3,
        r4: 4,
        r5: 5,
        n:0,
        rating:0,
        total:0

    }),
    new Product({
        imagePath: '/images/product-8.jpg',
        title: 'Denim Jacket',
        price: 2500,
        type: 1,
        r1: 1,
        r2: 2,
        r3: 3,
        r4: 4,
        r5: 5,
        n:0,
        rating:0,
        total:0

    }),
    new Product({
        imagePath: '/images/person_2.jpg',
        title: 'Classic Fit Suit',
        price: 8000,
        type: 1,
        r1: 1,
        r2: 2,
        r3: 3,
        r4: 4,
        r5: 5,
        n:0,
        rating:0,
        total:0
    })
];

var done=0;

for(var i=0;i<products.length;i++)
{
    products[i].save(function (err, result) {
        done++;
        if(done === products.length)
            exit();

    });
}

function exit(){
    mongoose.disconnect();
}
