const resource = '/companies/candidate-applies'

export default ($axios) => ({
    getListCV(data) {
        return $axios.get(`${resource}?page=${data.currentPage}`, {params: data})
    },

    getListCvApplyToAJob(data) {
        return $axios.get(`${resource}/job/${data.jobId}?page=${data.currentPage}`)
    },

    updateStatus(id, data) {
        return $axios.post(`${resource}/update-status/${id}`, data)
    },

    exportCvPdf(candidateApplyId, payload, responseType) {
        return $axios.post(`${resource}/export-cv-pdf/${candidateApplyId}`, payload, responseType)
    },

    translateCvCandidate(candidateApplyId) {
        return $axios.get(`${resource}/translate/${candidateApplyId}`)
    },

		getUserCv(userId) {
			return $axios.get(`${resource}/${userId}`)
		},

    acceptEducation(candidateApplyId) {
      return $axios.post(`${resource}/accept-education/${candidateApplyId}`)
    },

    acceptInterview(candidateApplyId) {
      return $axios.post(`${resource}/accept-interview/${candidateApplyId}`)
    },

    getCandidateEducationProgress(candidateApplyId) {
      return $axios.get(`${resource}/education-progress/${candidateApplyId}`)
    },

    getCandidateEducationStatistic(candidateApplyId) {
      return $axios.get(`${resource}/education-statistic/${candidateApplyId}`)
    },

    getCVMatchingPoint(candidateApplyId) {
      return $axios.get(`${resource}/matching-point/${candidateApplyId}`)
    },
})
