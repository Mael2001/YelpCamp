const express = require('express')
const router = express.Router();
const campgroundController = require('../controllers/campgrounds')
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

router.get('/', campgroundController.index);

router.post('/', isLoggedIn, validateCampground, campgroundController.createCampground);

router.get('/new', isLoggedIn, campgroundController.renderNewForm);

router.get('/:id', campgroundController.renderCampground);

router.put('/:id', isLoggedIn, isAuthor, validateCampground, campgroundController.updateCampground);

router.delete('/:id', isLoggedIn, isAuthor, campgroundController.deleteCampground);

router.get('/:id/edit', isLoggedIn, isAuthor, campgroundController.renderEditForm);

module.exports = router;