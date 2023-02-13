const express = require('express')
const router = express.Router();
const campgroundController = require('../controllers/campgrounds')
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

router.route('/')
    .get(campgroundController.index)
    .post(isLoggedIn, validateCampground, campgroundController.createCampground);

router.get('/new', isLoggedIn, campgroundController.renderNewForm);

router.route('/:id')
    .get(campgroundController.renderCampground)
    .put(isLoggedIn, isAuthor, validateCampground, campgroundController.updateCampground)
    .delete(isLoggedIn, isAuthor, campgroundController.deleteCampground);

router.get('/:id/edit', isLoggedIn, isAuthor, campgroundController.renderEditForm);

module.exports = router;