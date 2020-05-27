<template>
  <div class="main">
        <div class="main__panel">
          <select class="main__panel--select"
          v-model="kmlName"
        >
        <option>ruta1</option>
        <option>ruta2</option>
              </select>
    </div>
    <GMap :kml.sync="kmlName" :mapHeight="mapHeight"/>
  </div>
</template>

<script>

import Vue from 'vue'

import { mapGetters } from 'vuex'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { apiMixin } from '@/mixins/api'
import GMap from './GMap'


export default {
  name: 'view',
  components: {
    PulseLoader,
    GMap,
  },
  watch: {
    datepicker: function (val) {
      var someDate = new Date(val)
      this.initTimestamp = someDate.getTime()
      this.endTimestamp = this.initTimestamp + 86400000
      this.successDatepicker = true
      this.msgError = ''
    }
  },
  data () {
    return {
      window: {
        width: 0,
        height: 0,
      },     
      mapHeight: '0px',
      kmlName: 'ruta1',
      kmls: ['ruta1', 'ruta2']
    }
  },
  mixins: [apiMixin],
  computed: {
    ...mapGetters([
      'url',
    ]),
 
  },
  mounted () {
    this.handleResize()
  },
  methods: {    
    handleResize () {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
      this.mapHeight = ((this.window.height) - 0) + 'px'
    },
        
  },
}
</script>

<style lang="scss">
#app {
    background-color: white;
}

.main__license {
  padding-left: .5rem;
  padding-right: .5rem;
}

.main__list {
  padding-left: .5rem;
  padding-right: .5rem;
  background-color: transparent !important;
  overflow-y: scroll;
}

.main__list--element {
  background-color: white;
  cursor: pointer;
  padding: 8px;
  font-size: .9rem;
  border: 1px solid lightgray;
}

.main__list--element-selected {
  background-color: #019BCC;
  padding: 8px;
  font-size: .9rem;
  border: 1px solid lightgray;
}

.main__btn--img--close {
  width: 25px;
  height: 25px;
  padding-left: .4rem;
  padding-right: .4rem;
  left: 0px;
  position: fixed;
}
.main__btn--img--close2 {
  width: 25px;
  height: 25px;
  padding-left: .4rem;
  padding-right: .4rem;
  right: 0px;
  position: fixed;
}

.main__msgError {
  font-size: 1.2 rem;
  font-weight: bold;
  color: red;
}

.main__panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
}
.main__panel--select {
  width: 150px;
  height: 40px;
}
</style>
