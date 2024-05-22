
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


class Map {
    constructor() {
        this.center = [46.51437, 6.62371]
        this.map = L.map('map', {
            crs: L.CRS.EPSG2056,
            maxBounds: L.latLngBounds(L.latLng(this.center[0] - 0.015, this.center[1] - 0.03), L.latLng(this.center[0] + 0.015, this.center[1] + 0.03)),
            maxBoundsViscosity: 0.5,
            center: this.center,
            zoom: 22,
            maxZoom: 27,
            minZoom: 21,
            layers: [carte_1937]
        
        });
        this.layers = {
            1954: carte_1954,
            1926: carte_1926,
            1934: carte_1934,
            1937: carte_1937
        }
        this.backgroundLayers = []
        this.geoJsonLayer = null
    }

    setBackgroundLayers(layers) {
        this.backgroundLayers.forEach(layer => this.map.removeLayer(layer))
        this.backgroundLayers = layers
        this.backgroundLayers.forEach(layer => this.map.addLayer(layer))
    }

    setJsonLayer(data) {
        if(this.geoJsonLayer) this.map.removeLayer(this.geoJsonLayer)
        this.geoJsonLayer = L.geoJSON(data, {
                interactive: true
            }).addTo(this.map)
    }
}

export default Map