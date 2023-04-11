//I chose M2.5+ earthquakes for the past 7 days
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";

//Create initial map 
let myMap = L.map("map", {
    center: [40.36, -106.04],
    zoom: 5
});

//Add tile layer to map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json(url).then(function(response){
    //Taking a preview at the data I'm pulling
    console.log(response);
    //Creating our features variable and logging it to make sure we got the 
    //correct data
    features = response.features;
    console.log("Features", features);
    //This line shows how we want to call the coordinates in the following for loop
    console.log("Coordinates", features[0].geometry.coordinates);
    //Gather earthquake locations 
    let earthquakeLocation = [];
    for(i=0; i<features.length; i++){
        //feed in locations
        earthquakeLocation.push([features[i].geometry.coordinates[1],features[i].geometry.coordinates[0]]);
    };
    //Confirm we collected the data
    console.log("Locations", earthquakeLocation);

    //Create the markers
    for(j=0; j<earthquakeLocation.length;j++){
        L.circle(earthquakeLocation[j], {
            fillOpacity: 0.75,
            color: markerColour(),
            fillColor: markerColour(),
            radius: markerRadius(),

        }).bindPopup(``).addTo(myMap);
    };
    
});
