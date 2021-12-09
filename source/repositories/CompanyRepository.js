const resource = '/companies'

export default ($axios) => ({
  getCompanyProfile() {
    return $axios.get(`${resource}/me`)
  },
  editCompanyProfile(data, header) {
    return $axios.post(`${resource}/profiles/update-detail`, data, header)
  },
  getInvoices(currentPage) {
    return $axios.get(`${resource}/invoices?page=${currentPage}`)
  },
  updateCompanyPassword(payload) {
    return $axios.post(`${resource}/profiles/update-password`, payload)
  },
  updateCompanyProfileImage(payload, header) {
    return $axios.post(`${resource}/profiles/update-profile-image`, payload, header)
  }
})
