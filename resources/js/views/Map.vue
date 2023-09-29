
<template>

        <v-row>
            <v-col cols="3">
                <div>
                    <label for="">Seleccionar región</label>
                    <VueMultiselect v-model="selected_region" :options="region_list" :allow-empty="false" track-by="region"
                        label="region" @select="setCommunes()">
                    </VueMultiselect>
                </div>
                <div>
                    <div class="option-marker"><span @click="setMuseums()">Museos</span> <span class="btn-clear"
                            @click="_clearMuseums()">x</span></div>
                    <div class="option-marker"><span @click="setHospitals()">Centros de salud</span> <span class="btn-clear"
                            @click="_clearHospital()"><small> x <span v-if="hospital_qty">{{ hospital_qty }}</span></small></span>
                    </div>
                    <div class="option-marker"><span @click="setPolices()">Carabineros</span> <span class="btn-clear"
                            @click="_clearPolice()"><small>x</small></span></div>
                    <div class="option-marker"><span @click="setFirefighthers()">Bomberos</span> <span class="btn-clear"
                            @click="_clearFirefighthers()"><small>x</small></span></div>
                    <div class="option-marker"><span @click="setUniversities()">Universidades</span> <span class="btn-clear"
                            @click="_clearUniversities()"><small>x</small></span></div>
                    <!-- <div class="option-marker"><span @click="setSchool()">Colegios </span> <span class="btn-clear" @click="_clearSchool()"><small>x <span v-if="school_qty">{{school_qty}}</span></small></span></div> -->
                    <!-- <div class="option-marker"><span @click="setKinderIntegra()">Parvulos</span> <span class="btn-clear" @click="_clearKinderIntegra()"><small>x</small></span></div> -->
                    <hr>
                    <div class="option-marker"><span @click="setTouristicCircuit()">Circuito turístico</span></div>
                    <hr>
                    <div class="option-marker"><span @click="setLakes()">Lagos</span></div>
                    <hr>
                    <li style="cursor : pointer" @click="clearMarkers()">Limpiar mapa</li>
                    <div v-if="school_loading">cargando</div>
                </div>

                <hr>

                <div>
                    <label for="">Seleccionar Comuna</label>

                    <VueMultiselect v-model="selected_commune" :options="commune_list" :allow-empty="false" track-by="comuna"
                        label="comuna">
                    </VueMultiselect>
                </div>

                <div>
                    <ul>
                        <li style="cursor : pointer"><span @click="setCommunesLimitCommunes()">(ST_Touches)-Comunas que limitan
                                con </span></li>
                        <li style="cursor : pointer"><span @click="setSchoolsInCommune()">(ST_Within)-Colegios que estan la
                                comuna </span></li>
                        <li style="cursor : pointer"><span @click="setKinderIntegraCloseHospitalCommune()">(ST_Buffer)-parvulos
                                que esten a 200 mt de un centro de salud </span></li>

                    </ul>
                </div>
            </v-col>

            <v-col>
                <div id="map"></div>
            </v-col>
        </v-row>

    <div style="display: flex; justify-content: space-beetwen">
        <div style="width: 30%; padding: 1rem">


        </div>
        <div style="width: 70%">

        </div>



    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

import VueMultiselect from 'vue-multiselect'
import 'vue3-toastify/dist/index.css';

import { useHelpers } from '../composables/helpers'
import { useMaps } from '../composables/maps'
import { useMuseum } from '../composables/geoPoints/museum'
import { usePolice } from '../composables/geoPoints/police'
import { useHospital } from '../composables/geoPoints/hospital'
import { useFirefighters } from '../composables/geoPoints/firefighters'
import { useUniversity } from '../composables/geoPoints/universities'
import { useSchool } from '../composables/geoPoints/schools'
import { useKinderIntegra } from '../composables/geoPoints/kinderIntegra'

import { useCommunes } from '../composables/geoPolygons/communes'
import { useLakes } from '../composables/geoPolygons/lakes'

import { useTouristicCircuit } from '../composables/geoLines/touristicCircuits'



import { useTerritory } from '../composables/admin/territory'

import { useMapStore } from '@/stores/map'

let { getMuseums, clearMuseums } = useMuseum();
let { getPolices, clearPolice } = usePolice();
let { getHospitals, clearHospital, hospital_qty } = useHospital();
let { getFirefighters, clearFirefighters } = useFirefighters();
let { getUniversities, clearUniversities } = useUniversity();
let { getSchools, clearSchools, getSchoolsInCommune, school_loading, school_qty } = useSchool();
let { getKinderIntegra, clearKinderIntegra, getKinderIntegraCloseHospitalCommune, kinder_integra_loading, kinder_integra_qty } = useKinderIntegra();

let { getTouristicCircuit } = useTouristicCircuit();


let { getCommunes, getCommunesLimitCommunes } = useCommunes();
let { getLakes } = useLakes();

let { getRegionList, getCommunesByRegionList, region_list, commune_list } = useTerritory();

let mapStore = useMapStore()

var selected_region = ref({ region: 'Metropolitana de Santiago' })
var selected_commune = ref({ comuna: 'Santiago' })

onMounted(() => {
    initMap()
    getRegionList()
    setCommunes()
})

const initMap = () => mapStore.initMap()

const setCommunes = () => {
    getCommunes(selected_region.value.region)
    getCommunesByRegionList(selected_region.value.region)
}

const setMuseums = () => getMuseums(selected_region.value.region)

const setPolices = () => getPolices(selected_region.value.region)

const setHospitals = () => getHospitals(selected_region.value.region)

const setFirefighthers = () => getFirefighters(selected_region.value.region)

const setUniversities = () => getUniversities(selected_region.value.region)

const setSchool = () => getSchools(selected_region.value.region)
const setSchoolsInCommune = () => getSchoolsInCommune(selected_commune.value.comuna)

const setKinderIntegra = () => getKinderIntegra(selected_region.value.region)
const setKinderIntegraCloseHospitalCommune = () => getKinderIntegraCloseHospitalCommune(selected_commune.value.comuna)

const setTouristicCircuit = () => getTouristicCircuit(selected_region.value.region)

const setLakes = () => getLakes(selected_region.value.region)


const clearMarkers = () => {
    clearHospital()
    clearMuseums()
    clearPolice()
    clearFirefighters()
    clearUniversities()
    clearSchools()
    clearKinderIntegra()

}

const _clearHospital = () => clearHospital()
const _clearMuseums = () => clearMuseums()
const _clearPolice = () => clearPolice()
const _clearFirefighthers = () => clearFirefighters()
const _clearUniversities = () => clearUniversities()
const _clearSchool = () => clearSchools()
const _clearKinderIntegra = () => clearKinderIntegra()

const setCommunesLimitCommunes = () => getCommunesLimitCommunes(selected_region.value.region, selected_commune.value.comuna)

</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>
#map {
    width: 100%;
    height: 600px;
}

.btn-clear {
    background-color: rgb(218, 0, 0);
    color: rgb(58, 0, 0);
    padding: 2px 4px;
    border-radius: 10rem;
}

.option-marker {
    cursor: pointer;
    font-size: .9rem;

}
</style>