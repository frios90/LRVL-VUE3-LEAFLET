import { ref } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useHelpers } from '@/composables/helpers'
const { toastNotify } = useHelpers();

export const useTerritory = () => {

    let region_list = ref([]);
    let commune_list = ref([]);

    const getRegionList = async () => {

        try {
            let { data } = await axios.get('/admin/territories/region-list');
            region_list.value = data
            toastNotify({content: `se encontraron ${region_list.value.length} regiones`, autoClose: 1000});
        } catch (e) {
            toastNotify({content: `error al cargar el listado de regiones`, autoClose: 1000, type: 'error'});
        } finally {
        }
    }

    const getCommunesByRegionList = async (selected_region) => {

        try {
            let { data } = await axios.get('/admin/territories/communes-by-region-list', {params: {selected_region}});
            commune_list.value = data
            toastNotify({content: `se encontraron ${commune_list.value.length} regiones`, autoClose: 1000});
        } catch (e) {
            toastNotify({content: `error al cargar el listado de regiones`, autoClose: 1000, type: 'error'});
        } finally {
        }
    }

    return {
        region_list,
        commune_list,
        getRegionList,
        getCommunesByRegionList
    }
}