// State
const state = {
  title: "Chomsky"
}

// Getters
var getters = {
  title: state => state.title,
}

// Mutations
var mutations = {
  ['SET_TITLE'] (state, title) {
    state.title = title
  },
}

// Actions
var actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
