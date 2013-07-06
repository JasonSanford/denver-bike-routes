## Overview

Bike routes should represent a specific, interesting path that you would send a friend on, not just a general bike path in the area.

* Routes should start and end in semi-public places like shopping centers or coffee shops, not your house.
* Routes should adhere to a JSON schema like the one below. Some properties are required, some not.
* Some routes can be very complex, so keep the geometry (LineString) on one line to keep `routes.geojson` somewhat readable. See Route Simplification below.

## Example Route (route schema)

The root object in `routes.geojson` is a GeoJSON [FeatureCollection](http://geojson.org/geojson-spec.html#feature-collection-objects). The object below represents one feature, or one route, in the `features` array in the root `FeatureCollection`.

    {
        "type": "Feature",
        "geometry": {  # A GeoJSON [LineString](http://geojson.org/geojson-spec.html#linestring) representing the route
            "type": "LineString",
            "coordinates": [
                [-105.02641, 39.582270000000001],
                [-105.02647000000002, 39.582310000000007],
                [-105.02656999999999, 39.582410000000003],
                ...
                [-105.02638999999999, 39.582260000000005]
            ]
        },
        "properties": {
            "name": "Deer Creek Loop",  # required - The name of the route
            "description": "This ride includes a tough climb ...",  # required - A brief description of the route
            "distance": 43.2,  # required - The distance of the route in miles (yes miles, since this is Denver focused)
            "difficulty": 8,  # optional - The difficulty of the route on a scale of 1 to 10, where 10 is the most difficult
        }
    }

## Route Simplification

Some routes can be unnecessarily complex. We can use [Shapely](http://toblerity.github.io/shapely/manual.html) to simplify these so the repo's size doesn't get out of hand.

    import json

    from shapely.geometry import mapping, asShape

    # Use asShape to convert a GeoJSON-like dict to a shape
    shape = asShape({"type": "LineString", "coordinates": [[-105.02641, 39.582270000000001],[-105.02647000000002, 39.582310000000007],[-105.02638999999999, 39.582260000000005]]})

    # Simplify the LineString
    simplified = shape.simplify(0.0001)

    # Grab the simplified GeoJSON
    json.dumps(mapping(simplified))
