const resource = '/companies'

export default ($axios) => ({
  getCompanyProfile() {
    return $axios.get(`${resource}/me`)
  },
  editCompanyProfile(data, header) {
    return $axios.post(`${resource}/profiles/update-detail`, data, header)
  },
})
