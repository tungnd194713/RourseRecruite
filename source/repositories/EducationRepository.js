const resource = '/companies/educations'

export default ($axios) => ({
  getEducationList(data, query) {
    return $axios.post(`${resource}/list`, data, { params: query });
  },

  createNewEducation(data) {
    return $axios.post(`${resource}/create`, data);
  },

  getEducationDetail(id) {
    return $axios.get(`${resource}/detail/` + id);
  },

  getEducationParticipant(id) {
    return $axios.get(`${resource}/participants/` + id);
  }
})
