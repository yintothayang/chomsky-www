// State
const state = {
  mode: 'text',
}

// Getters
var getters = {
  mode: state => state.mode,
}

// Mutations
var mutations = {
  ["SET_MODE"] (state, mode) {
    state.mode = mode
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
