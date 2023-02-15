const express = require('express')
const router = express.Router();
const campgroundController = require('../controllers/campgrounds')
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({ storage })

router.route('/')
    .get(campgroundController.index)
    //.post(isLoggedIn, validateCampground, campgroundController.createCampground);
    .post(upload.array('image'), (req, res) => {
        console.log(req.body, req.files)
        res.send(req.body, req.files)
        console.dir(req.body.campground)
    })

router.get('/new', isLoggedIn, campgroundController.renderNewForm);

router.route('/:id')
    .get(campgroundController.renderCampground)
    .put(isLoggedIn, isAuthor, validateCampground, campgroundController.updateCampground)
    .delete(isLoggedIn, isAuthor, campgroundController.deleteCampground);

router.get('/:id/edit', isLoggedIn, isAuthor, campgroundController.renderEditForm);

module.exports = router;