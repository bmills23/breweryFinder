async function search() {
    try {
        const mapsResponse = await fetch('https://www.google.com/maps/search/?api=1&query=Denver');
        
        // Since the mode isn't set to 'no-cors', we can directly access JSON response
        const maps = await mapsResponse.json();
        
        console.log(maps);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

search();