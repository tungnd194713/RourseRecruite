const resource = '/companies/passwords'

export default ($axios) => ({
  forgotPassword(payload) {
    return $axios.post(`${resource}/email`, payload)
  },

  resetPassword(payload) {
    return $axios.post(`${resource}/reset`, payload)
  },
})
