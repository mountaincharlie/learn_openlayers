import './style.css';
import { Map, View } from 'ol';  // importing Map and View classes
import TileLayer from 'ol/layer/Tile';  // importing basic type of layer
import VectorLayer from 'ol/layer/Vector';
import VectorImageLayer from 'ol/layer/VectorImage';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import OSM from 'ol/source/OSM';  // basic ol map style
import Stamen from 'ol/source/Stamen';  // for type of TileLayer
import { fromLonLat } from 'ol/proj';  // for coordinates as lonlat
import { Geometry } from 'ol/geom';
import * as olProj from 'ol/proj';
import Icon from 'ol/style/Icon';
import {Fill, Stroke, Style} from 'ol/style';


// --- MAP INSTANCE

// my View
var myView = new View({
  center: fromLonLat([-1.2,51]),
  // [-1.162556, 51.360851] for Hercules House, [-0.558992271475887, 51.23603781956939] for my house
  // center: [0,0],
  zoom: 7
});

// my layers
var myBaseLayer = new TileLayer({
  source: new OSM()
  // source: new Stamen({layer: 'watercolor'})  // water colour effect
});
var myLabelsLayer = new TileLayer({
  source: new Stamen({layer: 'terrain-labels'})  // adds terrian labels
});
var myLayers = [myBaseLayer, ];  // myLabelsLayer

// instance of Map
const myMap = new Map({
  target: 'map',  // must match the id given in the html
  layers: myLayers,  // all layers
  view: myView
});


// --- VECTOR LAYERS

// styles for vectorLayer
const vectorLayerFill = new Style({
  fill: new Fill({
    color: 'rgba(45, 184, 184,0.3)',
  })
});
const vectorLayerStroke = new Style({
  stroke: new Stroke({
    color: 'rgb(45, 184, 184)',
    width: 2,
  })
});

// Calleva Park - vectorLayer
const vectorLayerCP = new VectorImageLayer({
  source: new VectorSource({
    url: './data/calleva_park.geojson',
    format: new GeoJSON()  // specifying the format the data is in
  }),
  style: [vectorLayerFill, vectorLayerStroke],
  visible: true,
  title: 'Calleva Park'
});
myMap.addLayer(vectorLayerCP);  // adding the vectorLayer to myMap 


// --- MARKERS

// Calleva Park - coors
// const coorsCP = [-1.162556, 51.360851];
// // const coorsHome = [-0.558992271475887, 51.23603781956939];

// // Calleva Park - marker
// const marker = new VectorLayer({  // creates new vetor layer
//   source: new VectorSource({  // new vector source
//     features: [  // has list of features which include the geometry Point
//       new Feature({
//         geometry: new Point(
//           olProj.fromLonLat(coorsCP)
//         )
//       })
//     ],
//   }),
//   style: new Style({  // need style inorder to create the marker icon from an image
//     image: new Icon({
//       color: [45, 184, 184],
//       crossOrigin: 'anonymous',
//       src: 'images/pin-icon.png',  // url to the image
//       anchor: [0.5, 1],  // halfway into the image and at the bottom (anchor coors start top left corner)
//       imgSize: [20,20],
//     })
//   }),
//   visible: true,
// });
// myMap.addLayer(marker);  // adding the marker to myMap 


// FUNCTIONS - put in seperate script later

/**
 * --- ideas:
 * 1) add buttons for 'My Work' and 'My Home', which onClick place a marker on the map
 * 2) add buttons for 'Take me to work' and 'Take me to home' which move the map to these locations 
 * 3) adding search box for coordinates which on submit takes the map to that location (with zoom 16) and creates a marker (sets the coors var) 
 */

// --- 1)

// name-coors object
let nameCoorsDict = {
  'callevaPark': [[-1.1626212987992801, 51.360904241893536],],
  'myHome': [[-0.558992271475887, 51.23603781956939],],
};

// Event listeners on DOM load
document.addEventListener('DOMContentLoaded', function(){
  // getting the make markers buttons
  const makeMarkerButtons = document.getElementsByClassName('make-marker');  
  // adding event listeners to all the makeMarkerButtons
  for (let i=0; i < makeMarkerButtons.length; ++i){
    const button = makeMarkerButtons[i];
    button.addEventListener('click', addMarker);
    console.log('button listener added')

  // getting the undo button
  const undoMarkersButton = document.getElementById('undo-markers'); 
  // undoMarkersButton.addEventListener('click', removeMarkers);
  undoMarkersButton.addEventListener('click', function(){
    window.location.reload();
  }); 
}
});

// TRY - find a way to access the markerLayer to remove specific markers
// // function to remove markers
// function removeMarkers(){
//   console.log('undo button works')
//   markerLayer.visible = false;

// };

// function to add marker
function addMarker(){
  
  let placeName = this.name;
  console.log(placeName);
  if (placeName in nameCoorsDict){
    console.log(nameCoorsDict[placeName]);
    let markerCoors = nameCoorsDict[placeName][0];  // this.value;
    // calls markerLayer function
    makeMarkerLayer(markerCoors, placeName);
  };

};

function makeMarkerLayer(markerCoors, placeName){
  console.log('running makeMarkerLayer');

  let markerLayer = new VectorLayer({  // creates new vetor layer
    source: new VectorSource({  // new vector source
      features: [  // has list of features which include the geometry Point
        new Feature({
          geometry: new Point(
            olProj.fromLonLat(markerCoors)
          )
        })
      ],
    }),
    style: new Style({  // need style inorder to create the marker icon from an image
      image: new Icon({
        color: [45, 184, 184],
        crossOrigin: 'anonymous',
        src: 'images/pin-icon.png',  // url to the image
        anchor: [0.5, 1],  // halfway into the image and at the bottom (anchor coors start top left corner)
        imgSize: [20,20],
      })
    }),
    visible: true,
    title: placeName
  });
  myMap.addLayer(markerLayer);  // adding the marker to myMap

  // TRY - trigger function call to move myMap to the coors (zoom 6)
  moveMapToMarker(markerCoors);

};

function moveMapToMarker(markerCoors){
  const mapView = myMap.getView();
  // const mapZoom = mapView.getZoom();
  mapView.setZoom(18);
  mapView.setCenter(fromLonLat(markerCoors));
  // myMap.getView().setProperties({'center':fromLonLat(markerCoors)});

  // myMap.getView().setProperties({'zoom':17});
  

  displayZoom(mapView);

};

function displayZoom(mapView){
  console.log('center now:' + mapView.getProperties().center);
  console.log('zoom now:' + mapView.getProperties().zoom);
  console.log(myMap.getView());
};

