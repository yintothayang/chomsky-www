import API from '../api'

// State
const state = {
  decks: [],
  selectedDecks: [],
}

// Getters
var getters = {
  decks: state => state.decks,
}

// Mutations
var mutations = {
  ["SET_DECKS"] (state, decks) {
    state.decks = decks
  },
  ["ADD_DECK"] (state, deck) {
    state.decks.push(deck)
  },
  ["LOAD_DECKS"] (state, card) {
    let local_decks = localStorage.getItem('decks')
    state.decks = !!local_decks ? JSON.parse(local_decks) : []
  },
  ["SAVE_DECKS"] (state, card) {
    localStorage.setItem('decks', JSON.stringify(state.decks))
  },
}

// Actions
var actions = {
  fetchDecks: ({commit}, data = {}) => {
    return API.decks.fetch(data).then(results => {
      commit("SET_DECKS", results.body)
      return results.body
    })
  },
  addDeck: ({commit}, data = {}) => {
    return API.decks.add(data).then(results => {
      commit("ADD_DECK", results.body)
      return results.body
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
