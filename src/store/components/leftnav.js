// State
const state = {
  open: false,
  links: [
    { title: 'Decks', icon: 'style', to: {name: 'decks'} },
    { title: 'Cards', icon: 'view_module', to: {name: 'cards'} },
    { title: 'Game', icon: 'videogame_asset', to: {name: 'game'} },
    { title: 'About', icon: 'contact_support', to: {name: 'about'} }
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
