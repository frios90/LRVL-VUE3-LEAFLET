import { ref } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useHelpers } from '@/composables/helpers';
import {useMapStore} from '@/stores/map';

let mapStore = useMapStore()

const { toastNotify } = useHelpers();

export const useLakes = () => {

    let polygons = ref([])

    const getLakes = async (selected_region) => {

        try {

            mapStore.map.removeLayer(polygons.value);

            const {data} = await axios.get('/geospatial/lakes/by-region', {params: {selected_region}})
            const lakes = data.lakes;
            const center = data.center;
            mapStore.changeCenter(center)

            var geometry_lakes = lakes.map((p) => {
                return {
                    "type": "Feature",
                    "properties": {"name": `<h2><img src="icons/mapa.png" width="22">${p.name},${p.type} </h2> <p>área: ${p.area} km2</p><p>área 2: ${p.area_km2} km2</p>`, "color": "blue"},
                    "geometry": JSON.parse(p.geometry)
                }
            })

            const onEachFeature = (feature, layer) => {
                if (feature.properties && feature.properties.name) {
                    layer.bindPopup(feature.properties.name);
                }
            }

            polygons.value = L.geoJSON(geometry_lakes, {
                style: function(feature) {
                    return {color: feature.properties.color}
                },
                onEachFeature: onEachFeature
            });

            polygons.value.addTo(mapStore.map);

            toastNotify({content: `poligonos de lagos cargados`, autoClose: 1000});
        } catch (e) {
            toastNotify({content: `error al cargar poligonos de lagos`, autoClose: 1000, type: 'error'});
        }
    }


    return {
        getLakes
    }
}