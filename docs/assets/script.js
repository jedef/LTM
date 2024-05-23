import geojson_1923 from './directory1923.geojson' with { type: 'json' };
import geojson_1951 from './directory1951.geojson' with { type: 'json' };
import Map from "./map.js"
import Directory from './addresses.js';

const directory_1923 = new Directory(geojson_1923)
const directory_1951 = new Directory(geojson_1951)
const allEntriesLabel="<tous>"

const data_year = {
  Y1923: "1923",
  Y1951: "1951"
}
const data_year_radiobutton = {
  Y1923: document.querySelector("input[name='date_selection'][value=old]"),
  Y1951: document.querySelector("input[name='date_selection'][value=new]")
}

const layers = {
  TOPOGRAPHIC: "TOPOGRAPHIC",
  CITYMAP: "CITYMAP",
  BOTH: "BOTH"
}

const layers_radiobutton = {
  TOPOGRAPHIC: document.querySelector("input[name='layers_selection'][value=TOPOGRAPHIC]"),
  CITYMAP: document.querySelector("input[name='layers_selection'][value=CITYMAP]"),
  BOTH: document.querySelector("input[name='layers_selection'][value=BOTH]")
}

class App {
  map = new Map()
  backgroundLayers = {}
  directory
  addressFilteredDirectory
  jobsFilteredDirectory


  constructor() {
    this.year = data_year.Y1923
    this.displayed_layers = layers.CITYMAP
  }

  #year
  get year() {
    return this.#year
  }
  set year(y) {
    if(y===this.#year) return
    this.#year = y
    switch(this.year) {
      case data_year.Y1923:
        this.backgroundLayers[layers.TOPOGRAPHIC] = [this.map.layers[1926]]
        this.backgroundLayers[layers.CITYMAP] = [this.map.layers[1937]]
        this.backgroundLayers[layers.BOTH] = [this.map.layers[1926], this.map.layers.transparent_1937]
        this.directory = directory_1923
        data_year_radiobutton.Y1923.checked=true
        break
      case data_year.Y1951:
        this.backgroundLayers[layers.TOPOGRAPHIC] = [this.map.layers[1954]]
        this.backgroundLayers[layers.CITYMAP] = [this.map.layers[1937]]
        this.backgroundLayers[layers.BOTH] = [this.map.layers[1954], this.map.layers.transparent_1937]
        this.directory = directory_1951
        data_year_radiobutton.Y1951.checked=true
        break
    }
    if([layers.TOPOGRAPHIC, layers.BOTH].includes(this.#displayed_layers)) this.map.setBackgroundLayers(this.backgroundLayers[this.#displayed_layers])
    this.updateJsonLayer()
  }
  #displayed_layers
  set displayed_layers(label) {
    layers_radiobutton[label].checked = true
    if(label !== this.#displayed_layers) this.map.setBackgroundLayers(this.backgroundLayers[label])
    this.#displayed_layers = label
  }

  #addressFilter = allEntriesLabel
  set addressFilter(filter) {
    if(filter===this.#addressFilter) return
    this.#addressFilter=filter
    this.updateJsonLayer()
  }

  #jobsFilter = allEntriesLabel
  set jobsFilter(filter) {
    if(filter===this.#jobsFilter) return
    this.#jobsFilter = filter
    this.jobsFilteredDirectory = this.addressFilteredDirectory.filterByJob(filter)
    this.map.setJsonLayer(this.jobsFilteredDirectory.geojson)
  }

  updateJsonLayer() {
    this.addressFilteredDirectory = this.directory.filterByAddress(this.#addressFilter)
    this.jobsFilteredDirectory = this.addressFilteredDirectory.filterByJob(this.#jobsFilter)
    console.log(this.jobsFilteredDirectory.geojson)
    this.map.setJsonLayer(this.jobsFilteredDirectory.geojson)
  }

}

const app = new App()

data_year_radiobutton.Y1923.addEventListener('change', function() {
  app.year=data_year.Y1923
})
data_year_radiobutton.Y1951.addEventListener('change', function() {
  app.year=data_year.Y1951
})
layers_radiobutton.TOPOGRAPHIC.addEventListener('change', function() {
  app.displayed_layers=layers.TOPOGRAPHIC
})
layers_radiobutton.CITYMAP.addEventListener('change', function() {
  app.displayed_layers=layers.CITYMAP
})
layers_radiobutton.BOTH.addEventListener('change', function() {
  app.displayed_layers=layers.BOTH
})

populateDropdown("jobsDropdown", app.directory.jobs);
document.getElementById("jobsDropdown").addEventListener("change", function (event) {
  const selectedValue = event.target.value;
  console.log("Selected value:", selectedValue);
  app.jobsFilter = selectedValue
});

populateDropdown("addressDropdown", app.directory.addresses);
document.getElementById("addressDropdown").addEventListener("change", function (event) {
  const selectedValue = event.target.value;
  console.log("Selected value:", selectedValue);
  app.addressFilter = selectedValue
});

// Function to populate the dropdown
function populateDropdown(dropdownId, values) {
  values.unshift(allEntriesLabel)
  const dropdown = document.getElementById(dropdownId);
  values.forEach(value => {
    const option = document.createElement("option");
    option.text = value;
    option.value = value;
    dropdown.add(option);
  });
}


function populateAddressesTable(data) {
  const tableBody = document.querySelector("#addresses_table tbody");

  data.forEach(item => {
      const row = document.createElement("tr");

      // Create and append the name cell
      const nameCell = document.createElement("td");
      nameCell.textContent = item.name;
      row.appendChild(nameCell);

      // Create and append the age cell
      const ageCell = document.createElement("td");
      ageCell.textContent = item.age;
      row.appendChild(ageCell);

      // Create and append the email cell
      const emailCell = document.createElement("td");
      emailCell.textContent = item.email;
      row.appendChild(emailCell);

      // Append the row to the table body
      tableBody.appendChild(row);
  });
}

