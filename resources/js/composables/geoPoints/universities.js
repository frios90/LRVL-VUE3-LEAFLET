import { ref } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useHelpers } from '@/composables/helpers';

import {useMapStore} from '@/stores/map';

const mapStore = useMapStore();
const { toastNotify } = useHelpers();

export const useUniversity = () => {
    let university_loading = ref(false)
    let university_markers = ref([])
    let university_qty = ref(0)

    const icon = L.icon({
        iconUrl: "icons/university.png",
        iconSize: [30, 40],
        iconAnchor: [15, 40]
    });

    const getUniversities = async (selected_region) => {

        try {
            university_loading.value = true
            clearUniversities()
            let { data } = await axios.get('/geospatial/universities/all', {params: {selected_region}});
            university_qty.value = data.length;

            await data.forEach( e => {
                university_markers.value.push(new L.marker([parseFloat(e.lat), parseFloat(e.long)], {
                    title: `${e.nombre_uni} - ${e.tipo_de_un}`,
                    draggable:false,
                    icon:icon
                }).bindPopup(`${e.name} <br> ${e.address}`)
                .addTo(mapStore.map));
            })
            toastNotify({content: `se cargarron ${university_qty.value} universidades`, autoClose: 1000});
        } catch (e) {
            toastNotify({content: `error al cargar los universidades`, autoClose: 1000, type: 'error'});
        } finally {
            university_loading.value = false
        }
    }

    const clearUniversities = () => {
        if (university_markers.value.length) {
            university_markers.value.forEach((museum) => mapStore.map.removeLayer(museum))
            university_markers.value = []
        };
    }

    return {
        university_markers,
        university_loading,
        university_qty,
        getUniversities,
        clearUniversities
    }
}