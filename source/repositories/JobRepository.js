const resource = '/companies/jobs'

export default ($axios) => ({
  getJobs(data) {
    return $axios.get(`${resource}?page=${data.currentPage}`, { params: data })
  },

  deleteJob(id) {
    return $axios.post(`${resource}/delete/${id}`)
  },

  blockJob(id) {
    return $axios.post(`${resource}/block/${id}`)
  },

  activeJob(id) {
    return $axios.post(`${resource}/active/${id}`)
  },

  createJob(payload, header) {
    return $axios.post(`${resource}/create`, payload, header)
  },

  getJob(id) {
    return $axios.get(`${resource}/${id}`)
  }
})
