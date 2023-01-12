import './style.css';
import { Map, View } from 'ol';  // importing Map and View classes
import TileLayer from 'ol/layer/Tile';  // importing basic type of layer
import OSM from 'ol/source/OSM';  // basic ol map style
import Stamen from 'ol/source/Stamen';  // for type of TileLayer
import { fromLonLat } from 'ol/proj';  // for coordinates as lonlat
import { Geometry } from 'ol/geom';


// creates a new instance of Map
const map = new Map({
  target: 'map',  // must match the id given in the html
  layers: [
    new TileLayer({
      source: new OSM()
      // source: new Stamen({layer: 'watercolor'})  // water colour effect
    }),
    // new TileLayer({
    //   source: new Stamen({layer: 'terrain-labels'})  // adds terrian labels
    // }),
  ],  // creates new TileLayer
  view: new View({
    center: fromLonLat([-1.162556, 51.360851]),  // [-1.162556, 51.360851] for Hercules House, [-0.5595, 51.236] for roughly my house
    // center: [0,0],
    zoom: 3
  })
});

// creating a marker (BUG: need to workout why its not showing up)
const marker = new ol.layer.Vector({  // creates new vetor layer
  source: new ol.source.Vector({  // new vector source
    features: [  // has list of features which include the geometry Point
      new ol.Feature({
        geometry: new ol.geom.Point(
          ol.proj.fromLonLat([-1.162556, 51.360851])
        )
      })
    ],
  }),
  style: new ol.style.Style({  // need style inorder to create the marker icon from an image
    image: new ol.style.Icon({
      color: [113, 140, 0],
      crossOrigin: 'anonymous',
      src: 'images/pin-icon.png',  // url to the image
      // anchor: [0.5, 1],  // halfway into the image and at the bottom (anchor coors start top left corner)
      imgSize: [840,841],
    })
  })
});

// making the marker visible
map.addLayer(marker)
