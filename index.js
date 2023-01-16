var locations = [
    ['Location 1 Name', 'New York, NY', 'Location 1 URL'],
    ['Location 2 Name', 'Newark, NJ', 'Location 2 URL'],
    ['Location 3 Name', 'Philadelphia, PA', 'Location 3 URL']
  ];
  
  let map;

  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  }
  
  window.initMap = initMap;
  