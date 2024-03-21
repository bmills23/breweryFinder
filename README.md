# breweryFinder

Brewery Finder Using

## Description

This project is a brewery finder application that utilizes the [Open Brewery DB API](https://api.openbrewerydb.org/breweries).  Automatically fetches nearest 50 breweries to current location.  This works best on mobile because
the app utilizes navigator.geolocation.getCurrentPosition() to function, meaning if your device doesn't utilize GPS, like a desktop, it'll use IP address instead of cell tower triangulation.

## License

This project is licensed under the [MIT License](LICENSE).