const resource = '/companies/candidate-applies'

export default ($axios) => ({
    getListCV(data) {
        return $axios.get(`${resource}?page=${data.currentPage}`, {params: data})
    },

    getListCvApplyToAJob(data) {
        return $axios.get(`${resource}/job/${data.jobId}?page=${data.currentPage}`)
    },

    updateStatus(id, data) {
        return $axios.post(`${resource}/update/${id}`, data)
    },

    exportCvPdf(candidateApplyId, payload, responseType) {
        return $axios.post(`${resource}/export-cv-pdf/${candidateApplyId}`, payload, responseType)
    },

    translateCvCandidate(candidateApplyId) {
        return $axios.get(`${resource}/translate/${candidateApplyId}`)
    }
})
