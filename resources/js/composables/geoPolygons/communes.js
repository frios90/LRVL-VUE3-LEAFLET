import { ref } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useHelpers } from '@/composables/helpers';
import {useMapStore} from '@/stores/map';

let mapStore = useMapStore()

const { toastNotify, getRandomHexColor } = useHelpers();

export const useCommunes = () => {

    let polygons = ref([])

    const getCommunes = async (selected_region) => {

        try {

            mapStore.map.removeLayer(polygons.value);

            const {data} = await axios.get('/geospatial/territory/communes/by-region', {params: {selected_region}})
            const communes = data.communes;
            const center = data.center;
            mapStore.changeCenter(center)

            var geometry_communes = communes.map((p) => {
                var _color =  getRandomHexColor();
                return {
                    "type": "Feature",
                    "properties": {"name": `<h2><img src="icons/mapa.png" width="22">${p.name}</h2> <p>área: ${p.area} km2</p>`, "color": _color},
                    "geometry": JSON.parse(p.geometry)
                }
            })

            const onEachFeature = (feature, layer) => {
                if (feature.properties && feature.properties.name) {
                    layer.bindPopup(feature.properties.name);
                }
            }

            polygons.value = L.geoJSON(geometry_communes, {
                style: function(feature) {
                    return {color: feature.properties.color}
                },
                onEachFeature: onEachFeature
            });

            polygons.value.addTo(mapStore.map);

            toastNotify({content: `poligonos de comunas cargados`, autoClose: 1000});
        } catch (e) {
            toastNotify({content: `error al cargar poligonos de comunas`, autoClose: 1000, type: 'error'});
        }

    }

    const getCommunesLimitCommunes = async (selected_region, selected_commune) => {

        try {
            mapStore.map.removeLayer(polygons.value);

            const {data} = await axios.get('/geospatial/territory/communes/commune-limit-communes', {params: {selected_region, selected_commune}})
            const communes = data.communes;
            const center = data.center;
            mapStore.changeCenter(center)

            var geometry_communes = communes.map((p) => {
                var _color =  getRandomHexColor();
                return {
                    "type": "Feature",
                    "properties": {"name": `<h2><img src="icons/mapa.png" width="22">${p.name}</h2> <p>área: ${p.area}</p>`, "color": _color},
                    "geometry": JSON.parse(p.geometry)
                }
            })

            const onEachFeature = (feature, layer) => {
                if (feature.properties && feature.properties.name) {
                    layer.bindPopup(feature.properties.name);
                }
            }

            polygons.value = L.geoJSON(geometry_communes, {
                style: function(feature) {
                    return {color: feature.properties.color}
                },
                onEachFeature: onEachFeature
            });

            polygons.value.addTo(mapStore.map);

            toastNotify({content: `poligonos de comunas cargados`, autoClose: 1000});
        } catch (e) {
            toastNotify({content: `error al cargar poligonos de comunas`, autoClose: 1000, type: 'error'});
        }

    }

    return {
        getCommunes,
        getCommunesLimitCommunes
    }
}