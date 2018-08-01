// State
const state = {
  activeUser: null
}

// Getters
var getters = {
  activeUser: state => state.activeUser,
}

// Mutations
var mutations = {
  ["UPDATE_ACTIVE_USER"] (state, updates) {
    state.activeUser = Object.assign(state.activeUser, updates)
  },
}

// Actions
var actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
