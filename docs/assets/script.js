
// const openstreetmap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

// });

// const carte_1937 = L.tileLayer('https://map.lausanne.ch/mapserv_proxy?ogcserver=source+for+image%2Fpng&cache_version=f02d60872083448896b5f8ad52bac9d1&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=plans_histo_lsne_1937&SERVERTYPE=mapserver&STYLES=&CRS=EPSG%3A2056&MAP_RESOLUTION=72.0000010728836&WIDTH=1298&HEIGHT=1390&BBOX=2538118.0625030207%2C1151439.0000032347%2C2538523.6874969765%2C1151873.374996762', {
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

// });
var wmsParams = {
    service: 'WMS',
    version: '1.1.0',
    request: 'GetMap',
    layers: 'plans_histo_lsne_1937',
    format: 'image/png',
    transparent: true,
    CRS: 'EPSG:2056', // Coordinate Reference System
    width: '1298',
    height: '1390',
    // Add other parameters here if needed
};

// Create the WMS layer
const wmsLayer = L.tileLayer.wms("https://map.lausanne.ch/mapserv_proxy?", {
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
});
// const carte_1954 = L.tileLayer('https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.zeitreihen/default/19541231/2056/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

// });
// 1:25000 1953, 1:50000 1954
const carte_1954 = L.tileLayer.swiss({
    format: 'png',
    layer: 'ch.swisstopo.zeitreihen',
    maxNativeZoom: 26,
    timestamp: '19541231'
  });
// https://wmts100.geo.admin.ch/1.0.0/ch.swisstopo.zeitreihen/default/19541231/2056/23/232/385.png
// https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.zeitreihen/default/19541231/2056/23/227/390.png
const center = [46.51437, 6.62371]
const map = L.map('map', {
    crs: L.CRS.EPSG2056,
    maxBounds: L.latLngBounds(L.latLng(center[0] - 0.015, center[1] - 0.03), L.latLng(center[0] + 0.015, center[1] + 0.03)),
    maxBoundsViscosity: 0.5,
    center: center,
    zoom: 22,
    maxZoom: 27,
    minZoom: 21,
    layers: [wmsLayer]

});

// Create map and attach id to element with id "mapid"
// var map = L.map('map', {
//     // Use LV95 (EPSG:2056) projection
//     crs: L.CRS.EPSG2056,
//   });
  
//   // Add Swiss layer with default options
//   L.tileLayer.swiss().addTo(map);
  
//   // Center the map on Switzerland
//   map.fitSwitzerland();