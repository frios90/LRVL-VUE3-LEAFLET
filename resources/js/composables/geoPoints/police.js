import { ref } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useHelpers } from '@/composables/helpers'
import {useMapStore} from '@/stores/map'
const mapStore = useMapStore()
const { toastNotify } = useHelpers();

export const usePolice = () => {
    let police_loading = ref(false)
    let police_markers = ref([])
    let police_qty = ref(0)

    const icon = L.icon({
        iconUrl: "icons/policia.png",
        iconSize: [30, 40],
        iconAnchor: [15, 40]
    });

    const getPolices = async (selected_region) => {

        try {
            police_loading.value = true

            clearPolice()
            let { data } = await axios.get('/geospatial/police/all', {params: {selected_region}});
            police_qty.value = data.length;

            await data.forEach( e => {
                police_markers.value.push(makeMarker(e).addTo(mapStore.map));
            })
            toastNotify({content: `se cargarron ${police_qty.value} cuarteles de carabineros`, autoClose: 1000});
        } catch (e) {
            toastNotify({content: `error al cargar los cuarteles de carabineros`, autoClose: 1000, type: 'error'});
        } finally {
            police_loading.value = false
        }
    }

    const makeMarker = (e) => {
        return  L.marker([parseFloat(e.lat), parseFloat(e.long)], {
            title: `${e.nombre_uni}`,
            draggable:false,
            icon:icon
        }).bindPopup(`${e.nombre_uni}  <br> ${e.address}`)
    }

    const clearPolice = () => {
        if (police_markers.value.length) {
            police_markers.value.forEach((museum) => mapStore.map.removeLayer(museum))
            police_markers.value = []
        };
    }


    return {
        police_markers,
        police_loading,
        police_qty,
        getPolices,
        clearPolice
    }
}