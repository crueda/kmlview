const config = state => state.app.config
const palette = state => state.app.config.palette
const isLoading = state => state.app.isLoading
const selectedOption = state => state.app.selectedOption
const url = state => state.app.url
const token = state => state.app.token
const username = state => state.app.username
const vehiclesData = state => state.app.vehiclesData

export {
  config,
  palette,
  isLoading,
  selectedOption,
  url,
  token,
  username,
  vehiclesData,
}