const resource = '/companies/payments'

export default ($axios) => ({
  chargeInvoice(id, payload) {
    return $axios.post(`${resource}/charge/${id}`, payload)
  },

  createToken(payload, header) {
    return $axios.post(`${resource}/create-token`, payload, header)
  },
})
