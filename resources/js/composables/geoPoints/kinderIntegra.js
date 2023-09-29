import { ref } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useHelpers } from '@/composables/helpers'
import {useMapStore} from '@/stores/map'

const mapStore = useMapStore()
const { toastNotify } = useHelpers();

export const useKinderIntegra = () => {
    let kinder_loading = ref(false)
    let kinder_markers = ref([])
    let kinder_qty = ref(0)
    let kinder_buffer_geometry = ref([])

    const icon = L.icon({
        iconUrl: "icons/kinder.png",
        iconSize: [30, 40],
        iconAnchor: [15, 40]
    });

    const getKinderIntegra = async (selected_region) => {

        try {

            kinder_loading.value = true

            clearKinderIntegra()

            let { data } = await axios.get('/geospatial/kinder-integra/all', {params: {selected_region}});

            kinder_qty.value = data.length;

            await data.forEach( e => {
                kinder_markers.value.push(makeMarker(e).addTo(mapStore.map));
            })

            toastNotify({content: `se cargarron ${kinder_qty.value} jardines de integra`, autoClose: 1000});
        } catch (e) {

            toastNotify({content: `error al cargar los jardnes de integra`, autoClose: 1000, type: 'error'});

        } finally {

            kinder_loading.value = false

        }
    }

    const getKinderIntegraCloseHospitalCommune = async (selected_commune) => {

        try {

            kinder_loading.value = true

            clearKinderIntegra()

            let { data } = await axios.get('/geospatial/kinder-integra/close-hospital-commmune', {params: {selected_commune}});

            kinder_qty.value = data.length;

            await data.forEach( e => {
                kinder_markers.value.push(makeMarker(e).addTo(mapStore.map));
            })

            var geometry = data.map((p) => {
                return {
                    "type": "Feature",
                    "properties": {"name": `<h2><img src="icons/mapa.png" width="22">${p.nombre}</h2>`, "color": "red"},
                    "geometry": JSON.parse(p.geometry)
                }
            })

            const onEachFeature = (feature, layer) => {
                if (feature.properties && feature.properties.name) {
                    layer.bindPopup(feature.properties.name);
                }
            }

            kinder_buffer_geometry.value = L.geoJSON(geometry, {
                style: function(feature) {
                    return {color: feature.properties.color}
                },
                onEachFeature: onEachFeature
            });

            kinder_buffer_geometry.value.addTo(mapStore.map);

            toastNotify({content: `se cargarron ${kinder_qty.value} jardines de integra`, autoClose: 1000});
        } catch (e) {

            toastNotify({content: `error al cargar los jardnes de integra`, autoClose: 1000, type: 'error'});
            console.log(e)
        } finally {

            kinder_loading.value = false

        }
    }

    const makeMarker = (e) => {
        return L.marker([parseFloat(e.lat), parseFloat(e.long)], {
            title: `${e.nombre}`,
            draggable:false,
            icon:icon
        }).bindPopup(setPopup(e))
    }

    const setPopup = (e) => {
        return `
        <div>
            <h2><strong>${e.nom_estab}</strong></h2>

        </div>

        `
    }

    const clearKinderIntegra = () => {
        if (kinder_markers.value.length) {
            kinder_markers.value.forEach((museum) =>  mapStore.map.removeLayer(museum))
            kinder_markers.value = []
        };
    }


    return {
        kinder_markers,
        kinder_loading,
        kinder_qty,
        getKinderIntegra,
        clearKinderIntegra,
        getKinderIntegraCloseHospitalCommune
    }
}