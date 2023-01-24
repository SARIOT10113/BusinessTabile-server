const express = require('express');
const router = express.Router();
const ProductController = require('../Controllers/ProductContraller')


router.get("/ProductList/:pageNo/:perPage/:searchKeyword",ProductController.ProductList);



module.exports = router