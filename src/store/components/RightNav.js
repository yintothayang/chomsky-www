// State
const state = {
  open: false,
  form: null,
}

// Getters
const getters = {
  open: state => state.open,
  form: state => state.form,
}

// Mutations
const mutations = {
  ['TOGGLE_OPEN'] (state) {
    state.open = !state.open
  },
  ['SET_OPEN'] (state, open) {
    state.open = open
  },
  ['SET_FORM'] (state, form) {
    state.form = form
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
