const resource = '/companies'

export default ($axios) => ({
  getCompanyProfile() {
    return $axios.get(`${resource}/me`)
  },
  getProvinces(data) {
    return $axios.get(`${resource}/provinces`, {params: data})
  },
  editCompanyProfile(data, header) {
    return $axios.post(`${resource}/profiles/update-detail`, data, header)
  },
})
