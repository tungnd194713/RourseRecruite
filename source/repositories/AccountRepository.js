const resource = '/companies'

export default ($axios) => ({
  forgotPassword(payload) {
    return $axios.post(`${resource}/passwords/email`, payload)
  },

  resetPassword(payload) {
    return $axios.post(`${resource}/passwords/reset`, payload)
  },

  registerAccount(payload) {
    return $axios.post(`${resource}/register`, payload)
  }
})
