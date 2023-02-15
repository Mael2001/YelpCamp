const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { cloudinary } = require('../cloudinary')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mbxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mbxToken })

module.exports.index = catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
});

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new')
};

module.exports.createCampground = catchAsync(async (req, res) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()

    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.author = req.user._id;
    await campground.save()

    req.flash('success', 'Successfully made a new campground');
    res.redirect(`/campgrounds/${campground._id}`)
});

module.exports.renderCampground = catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        }).populate('author');
    if (!campground) {
        req.flash('error', 'Campground not found');
        return res.redirect(`/campgrounds`);
    }
    res.render('campgrounds/show', { campground })
});

module.exports.updateCampground = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { deleteImages } = req.body;
    const campground = await Campground.findOneAndUpdate({ _id: id }, { ...req.body.campground });
    const newImgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...newImgs);
    await campground.save();
    if (deleteImages) {
        deleteImages.forEach(async filename => {
            await cloudinary.uploader.destroy(filename);
        });
        await campground.updateOne({ $pull: { images: { filename: { $in: deleteImages } } } })
    }
    req.flash('success', 'Successfully updated campground');
    res.redirect(`/campgrounds/${campground._id}`)
});

module.exports.deleteCampground = catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    if (!campground) {
        req.flash('error', 'Campground not found');
        return res.redirect(`/campgrounds`);
    }
    req.flash('success', 'Successfully deleted campground');
    res.redirect(`/campgrounds`)
});

module.exports.renderEditForm = catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
        req.flash('error', 'Campground not found');
        return res.redirect(`/campgrounds`);
    }
    res.render('campgrounds/edit', { campground })
});