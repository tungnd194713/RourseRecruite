export const state = () => ({
  job: {},
  prevRoute: '',
  jobUpdate: {},
  oldImageJobUpdate: '',
  prevRouteUpdate: '',
})

export const mutations = {
  SET_JOB(state, job) {
    state.job = job
  },
  SET_PREV_ROUTE(state, prevRoute) {
    state.prevRoute = prevRoute
  },
  SET_JOB_UPDATE(state, jobUpdate) {
    state.jobUpdate = jobUpdate
  },
  SET_OLD_IMAGE_JOB_UPDATE(state, oldImageJobUpdate) {
    state.oldImageJobUpdate = oldImageJobUpdate
  },
  SET_PREV_ROUTE_UPDATE(state, prevRouteUpdate) {
    state.prevRouteUpdate = prevRouteUpdate
  },
}

export const actions = {
  setJob({ commit }, job) {
    commit('SET_JOB', job)
  },
  setPrevRoute({ commit }, prevRoute) {
    commit('SET_PREV_ROUTE', prevRoute)
  },
  setJobUpdate({ commit }, jobUpdate) {
    commit('SET_JOB_UPDATE', jobUpdate)
  },
  setOldImageJobUpdate({ commit }, oldImageJobUpdate) {
    commit('SET_OLD_IMAGE_JOB_UPDATE', oldImageJobUpdate)
  },
  setPrevRouteUpdate({ commit }, prevRouteUpdate) {
    commit('SET_PREV_ROUTE_UPDATE', prevRouteUpdate)
  },
}

export const getters ={
  getJob(state) {
    return state.job
  },
  getPrevRoute(state) {
    return state.prevRoute
  },
  getJobUpdate(state) {
    return state.jobUpdate
  },
  getOldImageJobUpdate(state) {
    return state.oldImageJobUpdate
  },
  getPrevRouteUpdate(state) {
    return state.prevRouteUpdate
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}
