var mapquest_url = 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png',
    mapquest1 = new L.TileLayer(mapquest_url, {maxZoom: 18, subdomains: '1234'}),
    mapquest2 = new L.TileLayer(mapquest_url, {maxZoom: 18, subdomains: '1234'}),
    map1 = new L.Map('map1', {layers: [mapquest1], center: new L.LatLng(39.776880380637024, -104.98947143554686), zoom: 9}),
    map2 = new L.Map('map2', {layers: [mapquest2], center: new L.LatLng(39.776880380637024, -104.98947143554686), zoom: 10}),
    originalGeoJSON = null;

var startIcon = new L.Icon({
    iconUrl: 'img/markers/start.png',
    iconAnchor: [0, 28]
}),
endIcon = new L.Icon({
    iconUrl: 'img/markers/end.png',
    iconAnchor: [28, 28]
});

var displayedRoutes = new L.GeoJSON(null, {
    style: {
        color: '#ff0000',
        opacity: 0.8,
        width: 3
    },
    onEachFeature: function (feature, layer) {
        var popupContent = '<table class="table table-striped"><tbody>';
        for (property in feature.properties) {
            popupContent += '<tr><td><strong>' + property + '</strong></td><td>' + feature.properties[property] + '</td></tr>';
        }
        popupContent += '</tbody></table>';
        layer.bindPopup(popupContent);
    }
});
map1.addLayer(displayedRoutes);

var startEndMarkers = new L.LayerGroup();
map1.addLayer(startEndMarkers);

var drawnItems = new L.FeatureGroup();
map2.addLayer(drawnItems);

$.getJSON('routes.geojson', function (data){
    originalGeoJSON = data;
    timeToFilter();
});

var drawControl = new L.Control.Draw({
    draw: {
        position: 'topleft',
        polyline: {
            title: 'Draw a route',
            shapeOptions: {
                color: '#46461f',
                opacity: 0.8,
                weight: 7
            }
        },
        polygon: false,
        circle: false,
        rectangle: false,
        marker: false
    },
    edit: {
        featureGroup: drawnItems
    }
});
map2.addControl(drawControl);

map2.on('draw:drawstart', function (e) {
    drawnItems.clearLayers();
    document.getElementById('geojson-output').value = '';
});

map2.on('draw:created', function (e) {
    drawnItems.addLayer(e.layer);
    document.getElementById('geojson-output').value = JSON.stringify(drawnItems.toGeoJSON().features[0].geometry);
});

$('#distance-slider').noUiSlider({
    range: [0, 100],
    start: [5, 50],
    handles: 2,
    step: 1,
    serialization: {
        to: [$('#distance-from'), $('#distance-to')]
    },
    slide: timeToFilter
}).noUiSlider('disabled', true);

$('#difficulty-slider').noUiSlider({
    range: [0, 10],
    start: [0, 10],
    handles: 2,
    step: 1,
    serialization: {
        to: [$('#difficulty-from'), $('#difficulty-to')]
    },
    slide: timeToFilter
}).noUiSlider('disabled', true);

$('.check').on('click', function () {
    var $this = $(this),
        checked = $this.is(':checked') ? true : false,
        toggling = $this.data('toggling');
    if (checked) {
        $('.slider-val.' + toggling).removeAttr('disabled');
    } else {
        $('.slider-val.' + toggling).attr('disabled', 'shonuff');
    }
    $('#' + toggling + '-slider').noUiSlider('disabled', !checked);
    timeToFilter();
});

$('.slider-val').on('change', timeToFilter);

function timeToFilter() {
    displayedRoutes.clearLayers();
    startEndMarkers.clearLayers();
    var filtered = $.extend(true, {}, originalGeoJSON);

    if ($('#distance-check').is(':checked')) {
        var low = parseFloat($('#distance-from').val()),
            high = parseFloat($('#distance-to').val());
        newFiltered = {type: 'FeatureCollection', features: []};
        for (feature in filtered.features) {
            if (!('distance' in filtered.features[feature].properties) || (filtered.features[feature].properties.distance >= low && filtered.features[feature].properties.distance <= high)) {
                newFiltered.features.push(filtered.features[feature]);
                var geometry = filtered.features[feature].geometry,
                    first = geometry.coordinates[0],
                    last = geometry.coordinates[coordinates.length - 1],
                    startMarker = new L.Marker([first[1], first[0]], {icon: startIcon}),
                    endMarker = new L.Marker(last[1], last[0], {icon: endIcon});
                startEndMarkers.addLayer(startMarker).addLayer(endMarker);
            }
        }
        filtered = newFiltered;
    }

    if ($('#difficulty-check').is(':checked')) {
        var low = parseFloat($('#difficulty-from').val()),
            high = parseFloat($('#difficulty-to').val());
        newFiltered = {type: 'FeatureCollection', features: []};
        for (feature in filtered.features) {
            if (!('difficulty' in filtered.features[feature].properties) || (filtered.features[feature].properties.difficulty >= low && filtered.features[feature].properties.difficulty <= high)) {
                newFiltered.features.push(filtered.features[feature]);
                var geometry = filtered.features[feature].geometry,
                    first = geometry.coordinates[0],
                    last = geometry.coordinates[coordinates.length - 1],
                    startMarker = new L.Marker([first[1], first[0]], {icon: startIcon}),
                    endMarker = new L.Marker(last[1], last[0], {icon: endIcon});
                startEndMarkers.addLayer(startMarker).addLayer(endMarker);
            }
        }
        filtered = newFiltered;
    }

    displayedRoutes.addData(filtered);
}