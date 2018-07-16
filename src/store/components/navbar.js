// State
const state = {
  title: "Chomsky",
  filter: null,
}

// Getters
var getters = {
  title: state => state.title,
  filter: state => state.filter,
}

// Mutations
var mutations = {
  ['SET_TITLE'] (state, title) {
    state.title = title
  },
  ['SET_FILTER'] (state, filter) {
    state.filter = filter
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
