import { ref } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useHelpers } from '@/composables/helpers';
import {useMapStore} from '@/stores/map';

const mapStore = useMapStore();
const { toastNotify } = useHelpers();

export const useSchool = () => {
    let school_loading = ref(false)
    let school_markers = ref([])
    let school_qty = ref(0)

    const icon = L.icon({
        iconUrl: "icons/school.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32]
    });

    const getSchools = async (selected_region) => {
        try {
            school_loading.value = true;
            await clearSchools();
            const { data } = await axios.get('/geospatial/schools/all', {params: {selected_region}});
            school_qty.value = data.length
            await data.forEach( e => {
                school_markers.value.push(L.marker([parseFloat(e.lat), parseFloat(e.long)], {
                    title: `${e.nombre_uni} - ${e.tipo_de_un}`,
                    draggable:false,
                    icon:icon
                }).bindPopup(`${e.name} <br> ${e.address}`)
                .addTo(mapStore.map));
            })
            toastNotify({content: `se cargarron ${school_qty.value} colegios`, autoClose: 1000});
        } catch (e) {
            toastNotify({content: `error al cargar los colegios`, autoClose: 1000, type: 'error'});
        } finally {
            school_loading.value = false
        }
    }

    const getSchoolsInCommune = async (selected_commune) => {
        console.log(selected_commune)
        try {
            school_loading.value = true;
            await clearSchools();
            const { data } = await axios.get('/geospatial/schools/in-commune', {params: {selected_commune}});
            school_qty.value = data.length
            await data.forEach( e => {
                school_markers.value.push(L.marker([parseFloat(e.lat), parseFloat(e.long)], {
                    title: `${e.nombre_uni} - ${e.tipo_de_un}`,
                    draggable:false,
                    icon:icon
                }).bindPopup(`${e.name} <br> ${e.address}`)
                .addTo(mapStore.map));
            })
            toastNotify({content: `se cargarron ${school_qty.value} colegios`, autoClose: 1000});
        } catch (e) {
            toastNotify({content: `error al cargar los colegios`, autoClose: 1000, type: 'error'});
            console.log(e)
        } finally {
            school_loading.value = false
        }
    }

    const clearSchools = async () => {
        if (school_markers.value.length) {
            school_markers.value.forEach((museum) => mapStore.map.removeLayer(museum))
            school_markers.value = []
            school_qty.value = 0
        };
    }


    return {
        school_markers,
        school_loading,
        school_qty,
        getSchools,
        clearSchools,
        getSchoolsInCommune
    }
}