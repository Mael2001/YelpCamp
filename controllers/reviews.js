const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review')

module.exports.createReview = catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);

    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();

    req.flash('success', 'Successfully created review');
    res.redirect(`/campgrounds/${campground._id}`)
});

module.exports.deleteReview = catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    const review = await Review.findOneAndDelete({ _id: reviewId });

    req.flash('success', 'Successfully deleted review');
    res.redirect(`/campgrounds/${campground._id}`)
});