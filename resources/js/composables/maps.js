import { ref, onMounted } from "vue";
import {useMapStore} from '../stores/map'
const mapStore = useMapStore()

export const useMaps = () => {

    let map = ref(null)


    return {
        initMap,
        open_street_map,
        center_map,
        zoom_map
    }

}