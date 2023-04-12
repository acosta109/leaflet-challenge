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

function markerColour(depth){
    // Set a constant green value
    let green = 200;
    // Increase the red and blue values as depth increases
    let red = Math.floor(Math.min(255, depth * 10));
    let blue = Math.floor(Math.min(255, depth * 5));
    // Combine the color channels into an RGB color value
    return "rgb(" + red + "," + green + "," + blue + ")";
};
function markerRadius(magnitude){
    return Math.sqrt(magnitude) * 50000
};

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

    //Check how to access magnitutde
    console.log("Magnitutde:", features[0].properties.mag)

    //Create the markers
    for(j=0; j<earthquakeLocation.length;j++){
        let eqMagnitutde = features[j].properties.mag;
        let eqDepth = features[j].geometry.coordinates[2];
        //checking we have the magnitutdes
        console.log("Magnitutde", eqMagnitutde);
        //checking we have depths
        console.log("Depth", eqDepth);
        L.circle(earthquakeLocation[j], {
            fillOpacity: 0.75,
            color: markerColour(eqDepth),
            fillColor: markerColour(eqDepth),
            radius: markerRadius(eqMagnitutde),

        }).bindPopup("Filler. Need to complete").addTo(myMap);
    };
    
});
