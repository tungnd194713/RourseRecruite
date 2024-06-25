const resource = '/companies/jobs'

export default ($axios) => ({
	getAllJobs() {
    return $axios.get(`${resource}/all`)
  },

  getJobs(data) {
    return $axios.get(`${resource}?page=${data.currentPage}`, { params: data })
  },

  deleteJob(id) {
    return $axios.delete(`${resource}/${id}`)
  },

  changeStatus(id, data) {
    return $axios.post(`${resource}/${id}/change-status`, data)
  },

  createJob(payload, header) {
    return $axios.post(`${resource}/create`, payload, header)
  },

  getJob(id) {
    return $axios.get(`${resource}/${id}`)
  },

  openJobEducation(id) {
    return $axios.get(`${resource}/${id}/education-open`)
  },

  closeJobEducation(id) {
    return $axios.get(`${resource}/${id}/education-close`)
  },

  toggleJobEducation(id) {
    return $axios.get(`${resource}/${id}/education-toggle`)
  },

  sendChangeRequest(id, data) {
    return $axios.post(`${resource}/${id}/change-request`, data)
  },

  updateJob(id, data) {
    return $axios.post(`${resource}/update/${id}`, data)
  },

  getRequirementOptions() {
    return $axios.get(`/companies/requirement-options`)
  },

  checkCreateJob() {
    return $axios.get(`${resource}/package-company`)
  },

  countJobsPlanA(data) {
    return $axios.post(`${resource}/count-jobs-plan-a`, data)
  },


})
