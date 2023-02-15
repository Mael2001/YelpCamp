mapboxgl.accessToken = mapToken;
var campgroundInfo = JSON.parse(campground);
console.log(campgroundInfo.geometry)
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v11', // style URL
    center: [ ...campgroundInfo.geometry.coordinates ], // starting position [lng, lat]
    zoom: 8, // starting zoom
});

var marker = new mapboxgl.Marker()
    .setLngLat([ ...campgroundInfo.geometry.coordinates ])
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h4>${campgroundInfo.title}</h4> <p>${campgroundInfo.location}</p>`
        )
    )
    .addTo(map);