import './style.css';
import { Map, View } from 'ol';  // importing Map and View classes
import TileLayer from 'ol/layer/Tile';  // importing basic type of layer
import OSM from 'ol/source/OSM';
import Stamen from 'ol/source/Stamen';
import { fromLonLat } from 'ol/proj';

// creates a new instance of Map
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      // source: new OSM()
      source: new Stamen({layer: 'watercolor'})  // water colour effect
    })
  ],  // creates new TileLayer
  view: new View({
    // center: fromLonLat([-0.5595, 51.236]),  // [-1.162556, 51.360851] for Hercules House, [-0.5595, 51.236] for roughly my house
    center: [0,0],
    zoom: 3
  })
});
