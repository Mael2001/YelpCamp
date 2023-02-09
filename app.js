const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const expressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const ExpressError = require('./utils/ExpressError');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("DB Connected")
})
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}))

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

app.post('/campgrounds', catchAsync(async (req, res) => {
    if (!req.body.Campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground);
    await campground.save()
    res.redirect(`/campground/${campground._id}`)
}))

app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground })
}))

app.put('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.Campground });
    res.redirect(`/campgrounds/${campground._id}`)
}))


app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    res.redirect(`/campgrounds`)
}))

app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground })
}))


app.get('/makeCampground', catchAsync(async (req, res) => {
    const camp = new Campground({
        title: "My Backyard",
        description: "Cheap Camping"
    })
    await camp.save()
    res.send(camp)
}))

app.use((err, req, res, next) => {
    const { message = 500, statusCode = 'Something went wrong' } = err;
    res.status(statusCode).send(message)
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.listen(3000, () => {
    console.log('serving port 3000')
})