const resource = '/companies/invoices'

export default ($axios) => ({
  getInvoiceInMonth(data) {
    return $axios.get(`${resource}/detail-in-month`, { params: data })
  },
})
