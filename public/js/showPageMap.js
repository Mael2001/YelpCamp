mapboxgl.accessToken = mapToken;
var campgroundInfo = JSON.parse(campground);
console.log(campgroundInfo.geometry)
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [ ...campgroundInfo.geometry.coordinates ], // starting position [lng, lat]
    zoom: 8, // starting zoom
});

var marker = new mapboxgl.Marker()
    .setLngLat([ ...campgroundInfo.geometry.coordinates ])
    .addTo(map);