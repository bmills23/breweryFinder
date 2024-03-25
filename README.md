# breweryFinder

Brewery Finder Using Open Brewery DB API and Leaflet.js.  Totally open source.

## Description

This project is a brewery finder application that utilizes the [Open Brewery DB API](https://api.openbrewerydb.org/breweries).  Automatically fetches nearest 50 breweries to current location.  This works best on mobile because
the app utilizes navigator.geolocation.getCurrentPosition() to function, meaning if your device doesn't utilize GPS, like a desktop, it'll use IP address instead of cell tower triangulation.

## How To Use

Search function pending functionality.

Onload, will render pins for the nearest 25 breweries.  Can change the search param function on line 22, but please don't abuse the API.  It's free!!!!  

## Link to Static Website

https://bmills23.github.io/breweryFinder/

## License

This project is licensed under the [MIT License](LICENSE).
