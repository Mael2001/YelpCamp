const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10
        await new Campground({
            author: '63ea9252f32c5a51c90b8e56',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://source.unsplash.com/collection/483251',
                    filename:'Unsplash'
                },
                {
                    url: 'https://res.cloudinary.com/dzyv9g3yh/image/upload/v1676487915/YelpCamp/daoxldarexkrlrqbqd2x.jpg',
                    filename: 'YelpCamp/daoxldarexkrlrqbqd2x'
                },
                {
                    url: 'https://res.cloudinary.com/dzyv9g3yh/image/upload/v1676487915/YelpCamp/o22t52icmsnc0sndnhj1.jpg',
                    filename: 'YelpCamp/o22t52icmsnc0sndnhj1'
                },
                {
                    url: 'https://res.cloudinary.com/dzyv9g3yh/image/upload/v1676487915/YelpCamp/tknxtsw0bf8azybgliyn.png',
                    filename: 'YelpCamp/tknxtsw0bf8azybgliyn'
                },
                {
                    url: 'https://res.cloudinary.com/dzyv9g3yh/image/upload/v1676487916/YelpCamp/ajwpklwayjd38kiaojiv.png',
                    filename: 'YelpCamp/ajwpklwayjd38kiaojiv'
                },
                {
                    url: 'https://res.cloudinary.com/dzyv9g3yh/image/upload/v1676487916/YelpCamp/iswxqadkcytakflmeuib.png',
                    filename: 'YelpCamp/iswxqadkcytakflmeuib'
                },
                {
                    url: 'https://res.cloudinary.com/dzyv9g3yh/image/upload/v1676487916/YelpCamp/rxg1ientw3pqv9zcgavs.png',
                    filename: 'YelpCamp/rxg1ientw3pqv9zcgavs'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolorem error officia. Doloremque, rem ab sunt id vel laudantium, praesentium nam laborum suscipit, iusto exercitationem ipsum placeat similique et aliquid.',
            price: price
        }).save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})