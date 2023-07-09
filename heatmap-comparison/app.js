import {MapboxOverlay as DeckOverlay} from '@deck.gl/mapbox';
import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers';
import {HeatmapLayer} from '@deck.gl/aggregation-layers';
import mapboxgl from 'mapbox-gl';

import { addMapboxHeatmap } from './MapboxHeatmap.js'

const map = new mapboxgl.Map({
  container: 'map',
  style: 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json',
  center: [-122.42177834, 37.78346622],
  zoom: 12,
  bearing: 0,
  pitch: 0
});
window.map = map


const heatmapPoints = [
  {COORDINATES: [-122.42177834, 37.78346622], WEIGHT: 10},
  {COORDINATES: [-122.41346246584467, 37.79605716494423], WEIGHT: 10},
]

const heatmapLayer = new HeatmapLayer({
  id: 'heatmapLayer',
  data: heatmapPoints,
  getPosition: d => d.COORDINATES,
  getWeight: d => d.WEIGHT,
  aggregation: 'SUM'
});


const deckOverlay = new DeckOverlay({
  layers: [heatmapLayer]
});

map.addControl(deckOverlay);
map.addControl(new mapboxgl.NavigationControl());
  
addMapboxHeatmap(map, heatmapPoints)

let showDeckGLHeatmap = true;

const toggleButton = document.querySelector("#toggle-btn");
toggleButton.onclick = () => {
  showDeckGLHeatmap = !showDeckGLHeatmap;

  // Toggle Deck.GL heatmap layer
  const newLayer = heatmapLayer.clone({ visible: showDeckGLHeatmap });
  const refreshedLayers = []
  refreshedLayers.push(newLayer);
  heatmapLayer.context.deck.setProps({ layers: refreshedLayers })

  if (showDeckGLHeatmap) {
    toggleButton.innerText = "Deck.GL Heatmap (click to toggle)"

    map.setLayoutProperty('heatmap-layer', 'visibility', 'none')

  } else {
    toggleButton.innerText = "Mapbox Heatmap (click to toggle)"

    map.setLayoutProperty('heatmap-layer', 'visibility', 'visible')

  }
}