import { ref } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useHelpers } from '@/composables/helpers';
import { useMapStore } from '@/stores/map';

let mapStore = useMapStore()
const { toastNotify } = useHelpers();

export const useHospital = () => {
    let hospital_loading = ref(false)
    let hospital_qty = ref(0)
    let hospital_markers = ref([])

    const icon = L.icon({
        iconUrl: "icons/hospital.png",
        iconSize: [30, 40],
        iconAnchor: [15, 40]
    });

    const getHospitals = async (selected_region) => {

        try {
            hospital_loading.value = true
            clearHospital()
            let { data } = await axios.get('/geospatial/hospitals/all', {params: {selected_region}});
            hospital_qty.value = data.length
            await data.forEach( e => {
                hospital_markers.value.push(L.marker([parseFloat(e.lat), parseFloat(e.long)], {
                    title: `${e.nombre}`,
                    draggable:false,
                    icon:icon
                }).bindPopup(`${e.nombre}`)
                .addTo(mapStore.map));
            });
            toastNotify({content: `se cargarron ${hospital_qty.value} centros de salud`, autoClose: 1000});
        } catch (e) {
            toastNotify({content: `error al cargar los centros de salud`, autoClose: 1000, type: 'error'});
        }finally {
            hospital_loading.value = false
        }

    }

    const clearHospital = () => {
        if (hospital_markers.value.length) {
            hospital_markers.value.forEach(museum => mapStore.map.removeLayer(museum))
            hospital_markers.value = []
            hospital_qty.value = 0
        };
    }

    return {
        hospital_markers,
        hospital_qty,
        hospital_loading,
        getHospitals,
        clearHospital
    }
}