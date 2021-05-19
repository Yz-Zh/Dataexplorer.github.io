mapboxgl.accessToken = 'pk.eyJ1IjoieWlxaW5nbGkiLCJhIjoiY2tvb3ExaWhvMGUxbDJ6cGNza3V5YWg0ayJ9.EqtATjybhBeo9LeoULMoDg';

var map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [-0.1,51.5], // starting position [lng, lat]
  zoom: 9 // starting zoom
});

// Add the control to the map.
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);

map.on('load', function () {
        map.addSource('rent_info', {
            type: 'geojson',
            // Use a URL for the value for the `data` property.
            data:
        });

        map.addLayer({
            'id': 'rent_info',
            'type': 'circle',
            'source': 'rent_info',
            'paint': {
                'circle-radius': 4,
                'circle-stroke-width': 2,
                'circle-color': '#3a78b1',
                'circle-stroke-color': 'white'
            }
        });
    });

    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
    });

    map.on('mousemove', 'rent_info', function (e) {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    // Populate the popup and set its coordinates based on the feature.
    var feature = e.features[0];
    popup
    .setLngLat(feature.geometry.coordinates)
    .setText(
    feature.properties. +
    ' (' +
    feature.properties.abbrev +
    ')'
    )
    .addTo(map);
    });

    map.on('mouseleave', 'airport', function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
    });


    map.on('mouseenter', 'places', function (e) {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    });
