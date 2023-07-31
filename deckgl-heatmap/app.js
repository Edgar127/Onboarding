import {MapboxOverlay as DeckOverlay} from '@deck.gl/mapbox';
import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers';
import {HeatmapLayer} from '@deck.gl/aggregation-layers';

import mapboxgl from 'mapbox-gl';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json',
  center: [-122.42177834, 37.78346622],
  zoom: 12,
  bearing: 0,
  pitch: 0
});

const data = [
  {COORDINATES: [-122.42177834, 37.78346622], WEIGHT: 10},
  {COORDINATES: [-122.41346246584467, 37.79605716494423], WEIGHT: 10},
]

const heatmapLayer = new HeatmapLayer({
  id: 'heatmapLayer',
  data,
  getPosition: d => d.COORDINATES,
  getWeight: d => d.WEIGHT,
  aggregation: 'SUM',
  radiusPixels: 0.03 * 2**(map.getZoom()) 
});

map.on('zoom', () => {
  let currentZoom = map.getZoom();
  console.log("ZOOM CHANGED:", currentZoom);
  // const newLayer = heatmapLayer.clone({ radiusPixels: 0.03 * 2**(currentZoom) });
  const newLayer = heatmapLayer.clone({radiusPixels: 200 });
  const refreshedLayers = []
  refreshedLayers.push(newLayer);
  heatmapLayer.context.deck.setProps({ layers: refreshedLayers })
});

const deckOverlay = new DeckOverlay({
  layers: [
    heatmapLayer    
  ]
});

map.addControl(deckOverlay);
map.addControl(new mapboxgl.NavigationControl());