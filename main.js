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
import CircleStyle from 'ol/style/Circle.js';


// my View
var myView = new View({
  center: fromLonLat([-1.162556, 51.360851]),  // [-1.162556, 51.360851] for Hercules House, [-0.5595, 51.236] for roughly my house
  // center: [0,0],
  zoom: 16
});

// my layers
var myBaseLayer = new TileLayer({
  source: new OSM()
  // source: new Stamen({layer: 'watercolor'})  // water colour effect
});
var myLabelsLayer = new TileLayer({
  source: new Stamen({layer: 'terrain-labels'})  // adds terrian labels
});

// all the layers
var myLayers = [myBaseLayer, myLabelsLayer];

// creates a new instance of Map
const map = new Map({
  target: 'map',  // must match the id given in the html
  layers: myLayers,  // all layers
  view: myView
});

// adding a vector layer
const vectorLayer = new VectorImageLayer({
  source: new VectorSource({
    url: './data/polygons.geojson',
    format: new GeoJSON()  // specifying the format the data is in
  }),
  style: new Style({
    fill: new Fill({
      color: 'rgba(45, 184, 184,0.3)',
    }),
    stroke: new Stroke({
      color: 'rgb(45, 184, 184)',
      width: 2,
    }),
  }),
  visible: true,
  title: 'Calleva Park'
});

// adding the vectorLayer to the map (BUG: isnt showing up on map)
map.addLayer(vectorLayer);


// creating a marker (BUG: need to workout why its not showing up)
const marker = new VectorLayer({  // creates new vetor layer
  source: new VectorSource({  // new vector source
    features: [  // has list of features which include the geometry Point
      new Feature({
        geometry: new Point(
          olProj.fromLonLat([-1.162556, 51.360851])
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
  })
});

// making the marker visible
map.addLayer(marker);
