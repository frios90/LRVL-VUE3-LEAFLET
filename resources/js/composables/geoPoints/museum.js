import { ref } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useHelpers } from '@/composables/helpers'
import {useMapStore} from '@/stores/map'
import qs from 'qs';

const mapStore = useMapStore()
const { toastNotify } = useHelpers();

export const useMuseum = () => {
    let museums_loading = ref(false)
    let museums_markers = ref([])
    let museums_qty = ref(0)

    const icon = L.icon({
        iconUrl: "icons/museo.png",
        iconSize: [30, 40],
        iconAnchor: [15, 40]
    });

    const getMuseums = async (selected_region) => {

        try {

            museums_loading.value = true

            clearMuseums()

            let { data } = await axios.get('/geospatial/museums/all', {params: {selected_region}});


            /*** esto es ara probar en express */
            // const params = {
            //     selected_region
            // };
            // const encodedParams = qs.stringify(params);
            // const apiUrl = `http://127.0.0.1:5000?${encodedParams}`;
            // let { data } = await axios.get(apiUrl);
            /** */

            console.log("aqui queriendo hacer esto")
            console.log(data)
            museums_qty.value = data.length;

            await data.forEach( e => {
                museums_markers.value.push(makeMarker(e).addTo(mapStore.map));
            })

            toastNotify({content: `se cargarron ${museums_qty.value} museos`, autoClose: 1000});
        } catch (e) {
            console.log(e.message)
            toastNotify({content: `error al cargar los museos`, autoClose: 1000, type: 'error'});

        } finally {

            museums_loading.value = false

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
            <h2><strong>${e.nombre}</strong></h2>
            <div><small> ${e.tipo_inst} ${e.depend},  ${e.subdepend}</small> (<strong>${e.cobro_ent}</strong>)</div>
            <div><a href="${e.web}" target="_blank">web</a></div>
            <div>teléfono: ${e.telefono}</div>
            <div>email: ${e.email}</div>

            <hr>

            <div>Region: <strong>${e.region}</strong></div>
            <div>Provincia: <strong>${e.provincia}</strong></div>
            <div>Comuna: <strong>${e.comuna}</strong></div>
            <div>Direccion: <strong>${e.direccion}</strong></div>

            <hr>
            <div><strong>Contenidos</strong></div>
            <table>
                <tr>
                    <th>Arquitectura</th>
                    <td>${e.arq}</td>
                    <th>Arte</th>
                    <td>${e.arte}</td>
                </tr>
                <tr>
                    <th>Ciencias</th>
                    <td>${e.ciencias}</td>
                    <th>Etno</th>
                    <td>${e.etno}</td>
                </tr>
                <tr>
                    <th>Historia</th>
                    <td>${e.historia}</td>
                    <th>Historia natural</th>
                    <td>${e.hist_nat}</td>
                </tr>
                <tr>
                    <th>Otra</th>
                    <td>${e.otra}</td>
                </tr>
            </table>
            <hr>
            ${e.imagen}
        </div>

        `
    }

    const clearMuseums = () => {
        if (museums_markers.value.length) {
            museums_markers.value.forEach((museum) =>  mapStore.map.removeLayer(museum))
            museums_markers.value = []
        };
    }


    return {
        museums_markers,
        museums_loading,
        museums_qty,
        getMuseums,
        clearMuseums
    }
}