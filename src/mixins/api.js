import axios from 'axios'

export const apiMixin = {
  data () {
    return {
    }
  },
  methods: {
    getVehiclesData (token, url) {
      const apiURL = url + '/vehicles'
      return new Promise(function (resolve, reject) {
        axios.defaults.headers.common.Authorization = 'bearer ' + token
        axios.get(apiURL, { }, { timeout: 20000 }).then((response) => {
          if (response.status === 200 || response.status === 202) {
            resolve(response)
          } else {
            reject(new Error('api-error'))
          }
        }).catch((error) => {
          console.log(error)
          reject(new Error('server-error'))
        })
      })
    },
    getTracking (token, url, vehicle, timestampInit, timestampEnd) {
      const apiURL = url + '/tracking/vehicle'
      return new Promise(function (resolve, reject) {
        axios.defaults.headers.common.Authorization = 'bearer ' + token
        axios.post(apiURL, { 'vehicle': vehicle, 'timestamp_init': timestampInit, 'timestamp_end': timestampEnd }, { timeout: 20000 }).then((response) => {
          if (response.status === 200) {
            resolve(response)
          } else {
            reject(new Error('api-error'))
          }
        }).catch((error) => {
          console.log(error)
          reject(new Error('server-error'))
        })
      })
    },
    getAddress (lat, lon) {
      const apiURL = 'https://nominatim.openstreetmap.org/reverse'
      return new Promise(function (resolve, reject) {
        axios.get(apiURL, { params: { format: 'jsonv2', lat, lon } }, { timeout: 20000 }).then((response) => {
          if (response.status === 200) {
            resolve(response)
          } else {
            reject(new Error('api-error'))
          }
        }).catch((error) => {
          console.log(error)
          reject(new Error('server-error'))
        })
      })
    },    
  }
}
