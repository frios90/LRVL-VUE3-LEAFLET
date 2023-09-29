import {defineStore} from 'pinia'
import { ref } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export const useMapStore = defineStore('mapStore', {
    state: () => ({
        map: null,
        center_map: [-33.4395004, -70.6511933],
        zoom_map: 8,
        open_street_map: L.tileLayer(
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 20,
            }
        )
    }),
    actions: {
        initMap() {
            this.map = L.map("map", {
                center: this.center_map,
                zoom: this.zoom_map,
                layers: this.open_street_map,
                zoomControl: true,
                zoomAnimation:false,
                fadeAnimation:true,
                markerZoomAnimation:true
            });
        },
        changeCenter (center) {
            this.center = [center[0].lat, center[0].long];
            this.map.panTo(new L.LatLng(center[0].lat, center[0].long));
        }

    }
})