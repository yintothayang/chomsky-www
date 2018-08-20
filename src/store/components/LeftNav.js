// State
const state = {
  open: false,
}

// Getters
const getters = {
  open: state => state.open,
}

// Mutations
const mutations = {
  ['TOGGLE_OPEN'] (state) {
    state.open = !state.open
  },
  ['SET_OPEN'] (state, open) {
    state.open = open
  },
}

// Actions
var actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
