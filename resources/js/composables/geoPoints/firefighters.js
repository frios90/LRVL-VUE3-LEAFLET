import { ref } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useHelpers } from '@/composables/helpers';
import { useMapStore } from '@/stores/map';

let mapStore = useMapStore()
const { toastNotify } = useHelpers();

export const useFirefighters = () => {
    let firefighter_loading = ref(false)
    let firefighter_markers = ref([])
    let firefighter_qty = ref(0)

    const icon = L.icon({
        iconUrl: "icons/bomberos.png",
        iconSize: [30, 40],
        iconAnchor: [15, 40]
    });

    const getFirefighters = async (selected_region) => {

        try {
            firefighter_loading.value = true
            clearFirefighters()
            let { data } = await axios.get('/geospatial/firefighters/all', {params: {selected_region}});
            firefighter_qty.value = data.length;

            await data.forEach( e => {
                firefighter_markers.value.push(new L.marker([parseFloat(e.lat), parseFloat(e.long)], {
                    title: `${e.nombre_uni}`,
                    draggable:false,
                    icon:icon
                }).bindPopup(`${e.nombre_uni}  <br> ${e.address}`)
                .addTo(mapStore.map));
            })
            toastNotify({content: `se cargarron ${firefighter_qty.value} cuarteles de bomberos`, autoClose: 1000});
        } catch (e) {
            toastNotify({content: `error al cargar los cuarteles de bomberos`, autoClose: 1000, type: 'error'});
        } finally {
            firefighter_loading.value = false
        }
    }

    const clearFirefighters = () => {
        if (firefighter_markers.value.length) {
            firefighter_markers.value.forEach((museum) => {
                mapStore.map.removeLayer(museum)
            })
            firefighter_markers.value = []
        };
    }


    return {
        firefighter_markers,
        firefighter_loading,
        firefighter_qty,
        getFirefighters,
        clearFirefighters
    }
}