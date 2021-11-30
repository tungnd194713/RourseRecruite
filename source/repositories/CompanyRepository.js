const resource = '/companies/me'

export default ($axios) => ({
  getCompanyProfile() {
    return $axios.get(`${resource}`)
  },
})
