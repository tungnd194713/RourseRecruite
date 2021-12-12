const resource = '/companies/candidate-applies'

export default ($axios) => ({
    getListCV(data) {
        return $axios.get(`${resource}?page=${data.currentPage}`, {params: data})
    },

    updateStatus(id, data) {
        return $axios.post(`${resource}/update/${id}`, data)
    },

    exportCvPdf(candidateApplyId, payload, responseType) {
        return $axios.post(`${resource}/export-cv-pdf/${candidateApplyId}`, payload, responseType)
    },

    translateCvCandidate(candidateId) {
        return $axios.get(`${resource}/translate/${candidateId}`)
    }
})
