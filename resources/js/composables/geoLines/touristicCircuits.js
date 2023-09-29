import { ref } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useHelpers } from '@/composables/helpers';
import {useMapStore} from '@/stores/map';

let mapStore = useMapStore()

const { toastNotify, getRandomHexColor } = useHelpers();

export const useTouristicCircuit = () => {

    let lines = ref([])

    const getTouristicCircuit = async (selected_region) => {

        try {

            mapStore.map.removeLayer(lines.value);

            const {data} = await axios.get('/geospatial/touristic-circuits/by-region', {params: {selected_region}})
            const circuits = data.circuits;
            const center = data.center;
            mapStore.changeCenter(center)

            var geometry_circuits = circuits.map((p) => {
                var _color =  getRandomHexColor();
                console.log(_color);
                return {
                    "type": "Feature",
                    "properties": {"name": `<h2><img src="icons/mapa.png" width="22">${p.name}</h2> <p>Largo: ${p.length} km</p>`, "color": _color},
                    "geometry": JSON.parse(p.geometry)
                }
            })

            const onEachFeature = (feature, layer) => {
                if (feature.properties && feature.properties.name) {
                    layer.bindPopup(feature.properties.name);
                }
            }

            lines.value = L.geoJSON(geometry_circuits, {
                style: function(feature) {
                    return {color: feature.properties.color}
                },
                onEachFeature: onEachFeature
            });

            lines.value.addTo(mapStore.map);

            toastNotify({content: `Circuito cargado`, autoClose: 1000});
        } catch (e) {
            toastNotify({content: `Error al cargar circuitos turisticos`, autoClose: 1000, type: 'error'});
            console.log(e)
        }

    }


    return {
        getTouristicCircuit,
    }
}