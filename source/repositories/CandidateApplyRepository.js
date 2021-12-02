const resource = '/companies/candidate-applies'

export default ($axios) => ({
  getListCV(data) {
    return $axios.get(`${resource}?page=${data.currentPage}`, { params: data })
  },
})
