## Overview

Bike routes should represent a specific, interesting path that you would send a friend on, not just a general bike path in the area.

* Routes should start and end in semi-public places like shopping centers or coffee shops, not your house.
* Routes should adhere to a JSON schema like the one below. Some properties are required, some not.
* 

## Example Route (route schema)

The root object in `routes.geojson` is a GeoJSON [FeatureCollection](http://geojson.org/geojson-spec.html#feature-collection-objects). The object below represents one feature, or one route, in the `features` array in the root `FeatureCollection`.

    {
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-105.02641, 39.582270000000001],
                [-105.02647000000002, 39.582310000000007],
                [-105.02656999999999, 39.582410000000003],
                ....
            ]
        },
        "properties": {
            "name": "Deer Creek Loop",  # required - The name of the route
            "description": "This ride includes a tough climb ...",  # required - A brief description of the route
            "distance": 72420,  # required - The distance of the route in meters (yes meters. stop whining, you can google it)
            "difficulty": 8,  # optional - The difficulty of the route on a scale of 1 to 10, where 10 is the most difficult
        }
    }
