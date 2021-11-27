const resource = '/companies/passwords'

export default ($axios) => ({
  forgotPassword(payload) {
    return $axios.post(`${resource}/email1`, payload)
  },
})
