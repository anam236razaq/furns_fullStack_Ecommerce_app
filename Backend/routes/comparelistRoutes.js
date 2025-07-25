const express = require('express');
const compareListController = require('../controllers/compareListController');

const router = express.Router();

router.route('/add').post(compareListController.addToComparelist);
router.route('/remove').post(compareListController.removeFromComparelist);
router.route('/:userId').get(compareListController.getComparelist);

module.exports = router;