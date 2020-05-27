<template>
  <div>
    <gmap-map
      ref="gmap"
      :mapTypeId="'satellite'"
      :options="{
        zoomControl: false,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true,
        //motionTrackingControl: true,
        controlSize: 25,
        disableDefaultUi: false,
      }"
      :center.sync="center"
      :zoom.sync="zoom"
      :style="{ height: mapHeight }"
    >
      <gmap-marker
        :key="index"
        :icon="m.icon"
        v-for="(m, index) in markers"
        :position="m.position"
        :draggable="true"
        @click="onClickMarker(m)"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { utilMixin } from '@/mixins/util'

import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBrwRNJ-2P3V7iyGpnY6N_pq_QhJ1_2Eb4',
    libraries: 'places',
    region: 'Es',
    language: 'es',
  },
})

export default {
  name: 'gmap-historic',
  props: {
    mapHeight: String,
    kml: String,
  },
  data() {
    return {
      zoom: 6,
      center: { lat: 41.508, lng: -4.587 },
      markers: [],
      places: [],
      currentPlace: null,
      path: [],
      interval: null,
      centerMode: true,
      ball: 'https://images.kyroslbs.com/kml/dot20.png',
      ball2: 'https://images.kyroslbs.com/kml/dot20_2.png',
      layer: null,
    }
  },
  computed: {
    ...mapGetters([]),
    google: VueGoogleMaps.gmapApi,
  },
  mixins: [utilMixin],
  watch: {
    kml: function(val) {
      this.loadKml()
    }
  },
  mounted() {
    this.loadKml()
    this.geolocate()
    this.interval = setInterval(this.geolocate, 1000)
  },
  beforeDestroy: function() {
    clearInterval(this.interval)
  },
  methods: {
    loadKml() {
      this.$refs.gmap.$mapPromise.then(map => {
        let name = 'https://images.kyroslbs.com/kml/' + this.kml + '.kml' + '?dummy=' + new Date().getTime()
        let options = {
          map: map,
          url: name
        }
        this.layer = new google.maps.KmlLayer(options)
      })
    },
    onClickMarker (m) {
      this.centerMode = !this.centerMode
    },    
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        if (this.centerMode) {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        }
        // this.zoom = 15
        this.markers.length = 0
        let icon
        if (this.centerMode) {
          icon = this.ball
          if (this.google !== null) {
            icon = {
              url: this.ball,
              size: new this.google.maps.Size(20, 20),
              origin: new this.google.maps.Point(0, 0),
              anchor: new this.google.maps.Point(10, 10),
            }
          }
        } else {
          icon = this.ball2
          if (this.google !== null) {
            icon = {
              url: this.ball2,
              size: new this.google.maps.Size(20, 20),
              origin: new this.google.maps.Point(0, 0),
              anchor: new this.google.maps.Point(10, 10),
            }
          }          
        }
        let marker = {
          icon,
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        }
        this.markers.push(marker)
      })
    },
  },
}
</script>
