import adresses from './adresses.geojson' with { type: 'json' };
import Map from "./map.js"

const map = new Map()
map.setBackgroundLayers([map.layers[1937]])
map.setJsonLayer(adresses)

document.querySelector("input[name='date_selection'][value=old]").addEventListener('change', function() {
  if(this.checked) {
    map.setBackgroundLayers([map.layers[1926]])
    map.setJsonLayer(adresses)
  }
})
document.querySelector("input[name='date_selection'][value=new]").addEventListener('change', function() {
  if(this.checked) {
    map.setBackgroundLayers([map.layers[1954]])
    map.setJsonLayer({})
  }
})
