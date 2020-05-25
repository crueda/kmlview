import axios from 'axios'

const state = {
  sidebar: {
    opened: false,
  },
  config: {
    palette: {
      primary: '#4ae387',
      danger: '#e34a4a',
      info: '#4ab2e3',
      success: '#db76df',
      warning: '#f7cc36',
      white: '#fff',
      black: '#000',
      fontColor: '#34495e',
      transparent: 'transparent',
      lighterGray: '#ddd',
    },
  },
  loading: false,
  loggedIn: false,
  isLoading: false,
  selectedOption: '',
  url: 'http://localhost:3003/view2',
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NjA0OTY0OTgwOTMsImlzcyI6Imt5cm9zdmlldyIsInN1YiI6ImNydWVkYSJ9.oVRC6stj6DyToKc9ttgF15nQBOAK2pF6mJW2iY73p-8',
  username: '',
  role: '',
  usersData: [],
  vehiclesData: {},
  selectedTimestampInit: new Date(new Date().setDate(new Date().getDate() - 1)),
  selectedTimestampEnd: new Date(),
  jsonFields: {},
  jsonData: []
}

const mutations = {
  setLoading (state, data) {
    state.loading = data
  },
  setLoggedIn (state, data) {
    state.loggedIn = data
  },
  setIsLoading (state, isLoading) {
    state.isLoading = isLoading
  },
  setSelectedOption (state, data) {
    state.selectedOption = data
  },
  setUrl (state, data) {
    state.url = data
  },
  setUsername (state, data) {
    state.username = data
  },
  setToken (state, data) {
    state.token = data
  },
  setVehiclesData (state, data) {
    state.vehiclesData = data
  },
}

const actions = {
  loadVehiclesData: async function (context, data) {
    const apiURL = data.url + '/vehicles'
    axios.defaults.headers.common.Authorization = 'bearer ' + data.token
    axios.get(apiURL, { }, { timeout: 20000 }).then((response) => {
      var vd = response.data.data
      context.commit('setVehiclesData', vd)      
      return true
    }, (err) => {
      console.error(err)
      return false
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
