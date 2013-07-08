# Denver Bike Routes

<img src="https://travis-ci.org/JasonSanford/denver-bike-routes.png">

### A collaborative list of Denver bike routes

![routes](https://raw.github.com/JasonSanford/denver-bike-routes/master/img/routes-example.png)

## The Map

* View at GitHub [routes.geojson](routes.geojson)
* Advanced view with filters for distance and difficulty http://denver-bike-routes.geojason.info/

## License

CC-BY-SA

## How to contribute

The basics are below, but see [contributing.md](contributing.md) for details.

1. Fork the project
2. Add or edit a route by editing and following the format in `routes.geojson` (hint, it's GeoJSON)
3. Submit a pull request

## Validating the GeoJSON

When you submit a pull request, it will automatically check to ensure your GeoJSON is valid.

If you'd like to check yourself, you can run `./script/cibuild` locally, or pasting the contents of `routes.geojson` into http://geojsonlint.com.

## Credit

Inspired by (forked from) [benbalter/dc-wifi-social](https://github.com/benbalter/dc-wifi-social)
