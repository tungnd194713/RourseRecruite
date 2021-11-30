const resource = '/companies/jobs'

export default ($axios) => ({
  getJobs(data) {
    return $axios.get(`${resource}?page=${data.currentPage}`, { params: data })
  },
})
