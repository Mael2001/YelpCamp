const express = require('express')
const router = express.Router({ mergeParams: true });
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware')
const reviewController = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, reviewController.createReview);

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, reviewController.deleteReview);

module.exports = router;