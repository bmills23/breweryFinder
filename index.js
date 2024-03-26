// Create a button element
const button = document.createElement('button');
button.id = 'recenter-map';
button.classList.add('btn', 'btn-success');
button.textContent = 'Recenter Map';

// Append the button to the map container
const mapContainer = document.getElementById('map');
mapContainer.appendChild(button);

// Initialize the map
let map;

// initialize the map on the "map" div with a given center and zoom
async function initializeMap(latitude, longitude) {

  // Remove the map if it already exists
  if (map) {
    map.remove();
  }

  // Initialize the map with the new coordinates
  map = L.map('map').setView([latitude, longitude], 10);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 20,
  }).addTo(map);

  async function fetchBrews(latitude, longitude) {
    const cacheKey = `${latitude},${longitude}`;

    // Check if the response is already cached
    const cachedResponse = await caches.match(cacheKey);

    // If the response is cached, return the cached response else fetch the response
    async function fetchBreweryData(cachedResponse) {
      if (cachedResponse) {

        const breweries = await cachedResponse.json();
        console.log('Using cached response:', breweries);
        return breweries;

      } else {

        const params = new URLSearchParams();

        params.append('by_dist', `${latitude},${longitude}`)
        params.append('per_page', 25)
            
        const response = await fetch("https://api.openbrewerydb.org/v1/breweries?" + params, {
          method : 'GET',
          cache: 'force-cache'
        });

        // Cache the response
        const cache = await caches.open('breweries-cache');
        cache.put(cacheKey, response.clone());

        const breweries = await response.json();
        console.log('Using fetched response:', breweries);
        return breweries;
      }
    }

    // Create a promise to fetch the breweries
    const breweries = new Promise ((resolve, reject) => {
      fetchBreweryData(cachedResponse)
        .then(breweries => {
          resolve(breweries);
        })
        .catch(error => {
          console.error('Error fetching breweries:', error);
          reject(error);
        });
    }) 

    console.log(breweries);
    
    breweries.then(breweries => {
      breweries.forEach(brewery => {
        // Create the address string
        let address = '';
        // If the address_1 field is not empty, add it to the address string
        let searchAddress = brewery.address_1 ? brewery.address_1 : '';

        // Add brewery name to the address string
        address += `<b>${brewery.name}</b><br>`;

        // Begin constructing search string for Google Maps
        const search = `${brewery.name}, ${searchAddress}, ${brewery.city}, ${brewery.state}, ${brewery.postal_code}`;
        search.split(' ').join('+');

        //  Create link for Google Maps search
        https://www.google.com/maps/search/?api=1&query=pizza+seattle+wa
        address += `<a href="https://www.google.com/maps/search/?api=1&query=${search}" target="_blank">${searchAddress} ${brewery.city} ${brewery.state} ${brewery.postal_code}</a><br>`;
        address += `<br>${brewery.brewery_type.toUpperCase()}`;
        // Add a marker for each brewery
        L.marker([brewery.latitude, brewery.longitude]).addTo(map)
          .bindPopup(address)
          .openPopup();
        // Add a marker for the new address
        const marker = L.marker([latitude, longitude]).addTo(map)
          .bindPopup('You are here!')
          .openPopup();
        marker._icon.id = 'my-marker';
      });
    });
  }

  // Function to recenter the map
  const recenterMap = function(latitude, longitude) {
    map.setView([latitude, longitude]);
  };

  // Attach a click event listener to the button
  button.addEventListener('click', function() {
      recenterMap(latitude, longitude);
  });

  await fetchBrews(latitude, longitude)
    .then(() => {
      recenterMap(latitude, longitude);
    })
    .catch(error => {
      console.error('Error fetching breweries:', error);
    });
}

function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function success(pos) {
          const crd = pos.coords;
          const latitude = crd.latitude;
          const longitude = crd.longitude;
          const accuracy = crd.accuracy;

          console.log("Your current position is:");
          console.log(`Latitude : ${latitude}`);
          console.log(`Longitude: ${longitude}`);
          console.log(`More or less ${accuracy} meters.`);

          resolve({ latitude, longitude });
        },
        function error(err) {
          console.warn(`ERROR(${err.code}): ${err.message}`);
          reject(err);
        },
        { highAccuracy: true, maximumAge : 0 }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

function getBreweries() {
  getLocation()
    .then(({ latitude, longitude }) => {
      initializeMap(latitude, longitude);
    })
    .catch(error => {
      console.error("Error occurred:", error);
  });
}

window.addEventListener("load", getBreweries);
