const express = require('express');
const wishlistController = require('../controllers/wishlistController');

const router = express.Router();

router.route('/add').post(wishlistController.addToWishlist);
router.route('/remove').post(wishlistController.removeFromWishlist);
router.route('/:userId').get(wishlistController.getWishlist);

module.exports = router;