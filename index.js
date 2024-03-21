// initialize the map on the "map" div with a given center and zoom
function initializeMap(latitude, longitude) {
  // Initialize the map with the new coordinates
  const map = L.map('map').setView([latitude, longitude], 13);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 20,
  }).addTo(map);

  // Add a marker for the new address
  L.marker([latitude, longitude]).addTo(map)
    .bindPopup('You are here!')
    .openPopup();

  async function fetchBrews(latitude, longitude) {

    const params = new URLSearchParams();

    params.append('by_dist', `${latitude},${longitude}`)
        
    const response = await fetch("https://api.openbrewerydb.org/v1/breweries?" + params, {
      method : 'GET',
    });

    const breweries = response.json();
    
    breweries.then(breweries => {
      breweries.forEach(brewery => {
        // Create the address string
        let address = '';
        // If the address_1 field is not empty, add it to the address string
        let searchAddress = brewery.address_1 ? brewery.address_1 : '';

        // Add brewery name to the address string
        address += `<b>${brewery.name}</b><br>`;

        // Begin constructing search string for Google Maps
        const search = `${searchAddress}, ${brewery.city}, ${brewery.state}, ${brewery.postal_code}`;
        search.split(' ').join('+');

        //  Create link for Google Maps search
        address += `<a href="https://www.google.com/maps/place/${search}">${searchAddress} ${brewery.city} ${brewery.state} ${brewery.postal_code}</a><br>`;
        address += `<br>${brewery.brewery_type.toUpperCase()}`;
        // Add a marker for each brewery
        L.marker([brewery.latitude, brewery.longitude]).addTo(map)
          .bindPopup(address)
          .openPopup();
      });
    });
  }

  // Create a button element
  const button = document.createElement('button');
  button.id = 'recenter-map';
  button.classList.add('btn', 'btn-success');
  button.textContent = 'Recenter Map';

  // Function to recenter the map
  function recenterMap(latitude, longitude) {
    map.setView([latitude, longitude]);
  }

  // Attach a click event listener to the button
  button.addEventListener('click', function() {
      recenterMap(latitude, longitude);
  });

  // Append the button to the map container
  const mapContainer = document.getElementById('map');
  mapContainer.appendChild(button);

  fetchBrews(latitude, longitude);
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

window.addEventListener("load", () => {
  getLocation()
    .then(({ latitude, longitude }) => {
      initializeMap(latitude, longitude);
    })
    .catch(error => {
      console.error("Error occurred:", error);
  });
});
