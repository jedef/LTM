import geojson_1923 from './output.json' with { type: 'json' };
import Map from "./map.js"
import Addresses from './addresses.js';

const addresses_1923 = new Addresses(geojson_1923)

const map = new Map()
map.setBackgroundLayers([map.layers[1937]])
var addresses=addresses_1923
map.setJsonLayer(addresses.geojson)

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

// Function to populate the dropdown
function populateDropdown(dropdownId, values) {
  const dropdown = document.getElementById(dropdownId);
  values.forEach(value => {
    const option = document.createElement("option");
    option.text = value;
    option.value = value;
    dropdown.add(option);
  });
}

// Callback function to execute on change
function onDropdownChange(event) {
  const selectedValue = event.target.value;
  console.log("Selected value:", selectedValue);
  const geojson = addresses.filterByJob(selectedValue)
  console.log(geojson)
  map.setJsonLayer(geojson)
  // You can add more logic here to handle the change event
}

// Populate the dropdown
console.log(addresses)
populateDropdown("jobsDropdown", addresses.jobs);

// Add event listener to execute callback on change
document.getElementById("jobsDropdown").addEventListener("change", onDropdownChange);
