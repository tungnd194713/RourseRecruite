export const state = () => ({
  job: {},
  prevRoute: ''
})

export const mutations = {
  SET_JOB(state, job) {
    state.job = job
  },
  SET_PREV_ROUTE(state, prevRoute) {
    state.prevRoute = prevRoute
  }
}

export const actions = {
  setJob({ commit }, job) {
    commit('SET_JOB', job)
  },
  setPrevRoute({ commit }, prevRoute) {
    commit('SET_PREV_ROUTE', prevRoute)
  }
}

export const getters ={
  getJob(state) {
    return state.job
  },
  getPrevRoute(state) {
    return state.prevRoute
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
