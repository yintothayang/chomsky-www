// State
const state = {
  open: false,
  links: [
    { title: 'Decks', icon: 'style', to: {name: 'decks'} },
    { title: 'Cards', icon: 'photo_size_select_actual', to: {name: 'cards'} },
    { title: 'Game', icon: 'photo_size_select_actual', to: {name: 'game'} },
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
