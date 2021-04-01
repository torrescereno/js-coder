const express = require('express');
const router = express.Router();
const { upload } = require('../storage')
const dbMongo = require('../DB/DB_Mongo')

router.route('')

// Post creacion de productos
.post(upload.single('thumbnail'), (req, res) => {

    const { title, price } = req.body;
    const thumbnail = "/img/" + req.file.filename;

    const product = {
        title,
        price,
        thumbnail
    }

    dbMongo.addProduct(product);
    res.redirect('/')
});


module.exports = router;