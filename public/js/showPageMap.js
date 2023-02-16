var campgroundInfo = JSON.parse(campground);
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v11', // style URL
    center: [...campgroundInfo.coordinates], // starting position [lng, lat]
    zoom: 8, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

var marker = new mapboxgl.Marker()
    .setLngLat([...campgroundInfo.coordinates])
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h4>${campgroundInfo.title}</h4> <p>${campgroundInfo.location}</p>`
            )
    )
    .addTo(map);