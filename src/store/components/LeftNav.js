// State
const state = {
  open: false,
  links: [
    { title: 'Decks', icon: 'style', to: {name: 'decks'}, color: "purple" },
    { title: 'Cards', icon: 'view_module', to: {name: 'cards'}, color: "orange"},
    { title: 'Library', icon: 'local_library', to: {name: 'library'}, color: "blue"},
    // { title: 'Game', icon: 'videogame_asset', to: {name: 'game'} },
    { title: 'About', icon: 'contact_support', to: {name: 'about'}, color: "red" },
  ],
}

// Getters
const getters = {
  open: state => state.open,
  links: state => state.links,
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
