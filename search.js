const addressSearchInput = document.getElementById('address');
const list = document.getElementById('search-list');
const searchButton = document.getElementById('search-button');

const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');

const provider = new GeoSearch.OpenStreetMapProvider(
    {
        params: {
            countrycodes: 'us',
            addressdetails: 1,
            bounded: 1,
            limit: 5
        },
    }
);

let timeoutId;

addressSearchInput.addEventListener('input', async (event) => {
    list.innerHTML = '';

    // Implement a debounce function to prevent multiple API requests piling up
    clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
        const searchResults = await provider.search({
            query: event.target.value,
        });

        console.log(searchResults);

        for (let i = 0; i < searchResults.length; i++) {
            const listing = list.appendChild(document.createElement('li'));
            listing.classList.add('search-result');
            listing.innerHTML = searchResults[i].label;
            listing.dataset.latitude = searchResults[i].y;
            listing.dataset.longitude = searchResults[i].x;
        }

        const listings = document.querySelectorAll('.search-result');
        listings.forEach(listing => {
            listing.addEventListener('click', () => {
                addressSearchInput.value = listing.innerHTML;
                latitude.value = listing.dataset.latitude;
                longitude.value = listing.dataset.longitude;
                list.innerHTML = '';
            });
        });
    }, 300);
});

searchButton.addEventListener('click', async () => {
    const lat = latitude.value;
    const long = longitude.value;

    console.log(map);

    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    initializeMap(lat, long);

    map.setView([lat, long], 10);

    const newMarker = L.marker([lat, long]).addTo(map)
        .bindPopup('You are here!')
        .openPopup();
    newMarker._icon.id = 'my-marker';
});
