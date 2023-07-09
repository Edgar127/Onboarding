## Heatmap comparison

This example has both Deck.GL and Mapbox heatmaps for comparison.

To run it:

* Run `npm install`
* Then `npm run start`

### To build deck.gl source and use it in this example

1. Copy this folder to the deck.gl repo examples folder: `deck.gl/examples/heatmap-comparison`
2. Run `yarn start-local`

Try adding `console.log("Hello world!")` inside of `deck.gl/modules/aggregation-layers/heatmap-layer/heatmap-layer.ts`. Confirm that your print statement shows up.

### (OLD METHOD) To build deck.gl from source and use it in this example

1. Build the module you made changes to.

If it's the `aggregation-layers` one for example, you would run `yarn build-bundle` inside the folder:

```
deck.gl/modules/aggregation-layers
```

2. Then configure the package.json to load this module from local, than from the internet.

Run this command:

```
yarn add file://root/deck.gl/modules/aggregation-layers/
```

To re-install it, remove and then re-add:

```
yarn remove @deck.gl/aggregation-layers
```
