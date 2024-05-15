import adresses from './adresses.geojson' with { type: 'json' };

// Create the WMS layer
const carte_1937 = L.tileLayer.wms("https://map.lausanne.ch/mapserv_proxy?", {
    ogcserver: "source for image/png",
    // cache_version: "a661b634fe93457193007cb3c3deab4a",
    //version: '1.3.0',
    layers: 'plans_histo_lsne_1937',
    format: 'image/png',
    //transparent: true,
    //map_resolution: "72.0000010728836",
    //servertype: "mapserver",
    uppercase: "true",
    maxZoom: 27,
    //minZoom: 21,
    attribution: '© Lausanne, <a href="https://www.vd.ch/themes/territoire-et-construction/cadastre-et-geoinformation/geodonnees/commande-de-geodonnees/conditions-dutilisation/" target="_new">Etat de Vaud</a>, <a href="https://www.swisstopo.admin.ch/fr/bases-legales" target="_new">Swisstopo</a>'
});

const zeitreihen = {
    format: 'png',
    layer: 'ch.swisstopo.zeitreihen',
    maxNativeZoom: 26,
}

// 1:25000 1953, 1:50000 1954
const carte_1954 = L.tileLayer.swiss({...zeitreihen, timestamp: '19541231'});

// sous-gare: 1925, reste 1926
const carte_1926 = L.tileLayer.swiss({...zeitreihen, timestamp: '19261231'});

// tout actualisé en 1934
const carte_1934 = L.tileLayer.swiss({...zeitreihen, timestamp: '19341231'});

const center = [46.51437, 6.62371]

const map = L.map('map', {
    crs: L.CRS.EPSG2056,
    maxBounds: L.latLngBounds(L.latLng(center[0] - 0.015, center[1] - 0.03), L.latLng(center[0] + 0.015, center[1] + 0.03)),
    maxBoundsViscosity: 0.5,
    center: center,
    zoom: 22,
    maxZoom: 27,
    minZoom: 21,
    layers: [carte_1937]

});

const carte_adresses = L.geoJSON(adresses, {
    interactive: true
})
carte_adresses.addTo(map)



const containerDiv = document.querySelector('.container');

// Get radio buttons only within the container div
const radioButtons = containerDiv.querySelectorAll('input[type="radio"]');

// Add event listener to each radio button
radioButtons.forEach(radioButton => {
  radioButton.addEventListener('change', function() {
    // Check which radio button is selected
    if (this.checked) {
      console.log('Selected option:', this.value);
      // You can perform any action based on the selected option here
    }
  });
});
