export const state = () => ({
  job: {}
})

export const mutations = {
  SET_JOB(state, job) {
    state.job = job
  }
}

export const actions = {
  setJob({ commit }, job) {
    commit('SET_JOB', job)
  }
}

export const getters ={
  getJob(state) {
    return state.job
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
