const resource = '/companies/invoices'

export default ($axios) => ({
  getInvoiceInMonth(data) {
    return $axios.get(`${resource}/detail-in-month`, { params: data })
  },
  getCourseUnlockHistory(query, body = {}) {
    return $axios.post(`${resource}/courses`, body, { params: query });
  },
  payCourse(id) {
    return $axios.post(`${resource}/courses/${id}`);
  },
})
