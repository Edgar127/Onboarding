function addMapboxHeatmap(map, heatmapPoints) {
    map.on('load', () => {
      // See mapbox heat layer https://docs.mapbox.com/mapbox-gl-js/example/heatmap-layer/
        const geojsonData = {
          "type": "FeatureCollection",
          "features": []
        }

        for (let d of heatmapPoints) {
          const { COORDINATES, WEIGHT } = d 
          const newFeature = {
            "type": "Feature",
            "properties": { "weight": WEIGHT },
            "geometry": {
              "type": "Point",
              "coordinates": COORDINATES
            }
          }

          geojsonData.features.push(newFeature)
        }

        // Add a geojson point source.
        map.addSource('heatmap-points', {
            'type': 'geojson',
            'data': geojsonData
        });

        map.addLayer(
            {
                'id': 'heatmap-layer',
                'type': 'heatmap',
                'source': 'heatmap-points',
                'paint': {
                    // Increase the heatmap weight based on frequency and property magnitude
                    'heatmap-weight': ['get', 'weight'],
                    // Increase the heatmap color weight weight by zoom level
                    // heatmap-intensity is a multiplier on top of heatmap-weight
                    'heatmap-intensity': 1,
                    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                    // Begin color ramp at 0-stop with a 0-transparancy color
                    // to create a blur-like effect.
                    'heatmap-color': [
                        'interpolate',
                        ['linear'],
                        ['heatmap-density'],
                        0,
                        'rgba(33,102,172,0)',
                        0.2,
                        'rgb(103,169,207)',
                        0.4,
                        'rgb(209,229,240)',
                        0.6,
                        'rgb(253,219,199)',
                        0.8,
                        'rgb(239,138,98)',
                        1,
                        'rgb(178,24,43)'
                    ],
                    // Adjust the heatmap radius by zoom level
                    'heatmap-radius': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        0,
                        2,
                        9,
                        20
                    ],
                    'heatmap-opacity': 1
                }
            }
        );
        map.setLayoutProperty('heatmap-layer', 'visibility', 'none')
    });

}

export { addMapboxHeatmap }