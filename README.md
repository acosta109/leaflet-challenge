<h1> Earthquake Map </h1>
<h3 href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php"> Data Source: USGS</h3>
<br>
<p> For the purposes of this assignment, I used data for all earthquakes with magnitutdes  <strong> 2.5 </strong>+ </p>
<img width="1437" alt="Final Map Screenshot" src="https://user-images.githubusercontent.com/119609975/231823080-8b75f717-7720-4704-9ae0-fd6bd2ee6626.png">

<p> The above map is end results of my assignment. My goal was to read in the earthquak data from the aforementioned data source and produce markers whose radii increase as the magnitude of the earthquak increases and whose colour darkens as the depth of the earthquake deepens. </p>
<br>

```
let myMap = L.map("map", {
    center: [40.36, -106.04],
    zoom: 5
});
```

<p> The above code creates our map and centeres it around the west coast of the United States. Please note the provided image is zoomed out further than the initial zoom value <strong> 5 </strong> as I wished to show a variety of marker colours as the markers centered around the west coast were fairly similar in colour. </p>

```
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

function markerColour(depth){
    let green = 200;
    let red = Math.floor(Math.min(255, depth * 20));
    let blue = Math.floor(Math.min(255, depth * 15));
    return "rgb(" + red + "," + green + "," + blue + ")";
};
function markerRadius(magnitude){
    return Math.sqrt(magnitude) * 50000
};
```

<p> Our next lines of code create the tile layer map and prepare the functions I will use later in my program to adjust marker size and colour. We can observe from my markerColour function that I am adjusting the red and blue numbers in the rgb(r,g,b) return value. This code directly corresponds to my how I thought about changing the colour of my markers. I wanted to numerical work with colours and then return those values as a colour. I was able to do this more smoothly working with rgb(r,g,b) values than hexcode for the colours. </p>

```
d3.json(url).then(function(response){
    console.log(response);
    features = response.features;
    console.log("Features", features);
    console.log("Coordinates", features[0].geometry.coordinates);
    let earthquakeLocation = [];
    for(i=0; i<features.length; i++){
        earthquakeLocation.push([features[i].geometry.coordinates[1],features[i].geometry.coordinates[0]]);
    };
    console.log("Locations", earthquakeLocation);

    console.log("Magnitutde:", features[0].properties.mag)

    for(j=0; j<earthquakeLocation.length;j++){
        let eqMagnitutde = features[j].properties.mag;
        let eqDepth = features[j].geometry.coordinates[2];
        console.log("Magnitutde", eqMagnitutde);
        console.log("Depth", eqDepth);
        L.circle(earthquakeLocation[j], {
            fillOpacity: 0.75,
            color: markerColour(eqDepth),
            fillColor: markerColour(eqDepth),
            radius: markerRadius(eqMagnitutde),

        }).bindPopup(`<h1> Coordinates: ${earthquakeLocation[j]}</h1> <br> <h3> Magntitude: ${eqMagnitutde} | Depth: ${eqDepth}</h3>`).addTo(myMap);
};
```

 <p> The above code is the meat and potatoes of the project. I'm reading in the data from the JSON file, extracting the coordianates, and then creating the markers in my second for loop binding each marker with a popup that displays the latitude, longitude, and depth of the earthquake. Please note, my second for loop uses my previously established functions for marker size and colour.</p>
    
```
let legend = L.control({position: 'bottomright'});
legend.onAdd = function () {
    let div = L.DomUtil.create('div', 'info legend');
    let colorLabels = ['< 10', '10 - 20', '20 - 30', '30 - 40', '40 - 50', '> 50'];

    // Loop through our color labels and generate a label with a colored square for each interval
    for (let i = 0; i < colorLabels.length; i++) {
        div.innerHTML +=
            '<i style="background:' + markerColour((i + 1) * 10) + '"></i> ' +
            colorLabels[i] + '<br>';
    }
    return div;
};
legend.addTo(myMap);

```

<p> This is the last section of my JavaScipt file! It creates the legend and adds it to my map. As a closing note, I'd like to remark I provide copious amounts of comments throughout my written code explaining what each part does and clarifying any parts of my code that could be unique to my stlye of coding. </p>    
