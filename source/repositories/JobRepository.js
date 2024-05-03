const resource = '/companies/jobs'

export default ($axios) => ({
  getJobs(data) {
    return $axios.get(`${resource}?page=${data.currentPage}`, { params: data })
  },

  deleteJob(id) {
    return $axios.delete(`${resource}/${id}`)
  },

  changeStatus(id, data) {
    return $axios.post(`${resource}/change-status/${id}`, data)
  },

  createJob(payload, header) {
    return $axios.post(`${resource}/create`, payload, header)
  },

  getJob(id) {
    return $axios.get(`${resource}/${id}`)
  },

  toggleJobEducation(id) {
    return $axios.get(`${resource}/${id}/education-toggle`)
  },

  updateJob(id, data) {
    return $axios.post(`${resource}/update/${id}`, data)
  },

  checkCreateJob() {
    return $axios.get(`${resource}/package-company`)
  },

  countJobsPlanA(data) {
    return $axios.post(`${resource}/count-jobs-plan-a`, data)
  },

  getRequirementOptions() {
    return $axios.get(`/companies/requirement-options`)
  },
})
