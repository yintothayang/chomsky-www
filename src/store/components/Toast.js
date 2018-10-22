// State
const state = {
  toast: {
    message: null,
    open: false,
    color: "black",
  }
}

// Getters
const getters = {
  toast: state => state.toast,
}

// Mutations
const mutations = {
  ['SET_TOAST'] (state, toast) {
    state.toast = toast
  },
}

// Actions
const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
