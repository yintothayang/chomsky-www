import API from '../api'
import uuid from 'uuid/v4'

// State
const state = {
  decks: [],
  selectedDecks: [],
}

// Getters
var getters = {
  decks: state => state.decks,
  selectedDecks: state => state.selectedDecks,
}

// Mutations
var mutations = {
  ["SET_DECKS"] (state, decks) {
    state.decks = decks
  },
  ["ADD_DECK"] (state, deck) {
    deck.id = uuid()
    state.decks.push(deck)
  },
  ["TOGGLE_SELECTED"] (state, deck) {
    let i = state.selectedDecks.indexOf(deck)
    if(i > -1){
      state.selectedDecks.splice(i, 1)
    } else {
      state.selectedDecks.push(deck)
    }
  },
  ["SET_SELECTED"] (state, decks=[]) {
    state.selectedDecks = decks
  },
  ["DELETE_DECK"] (state, deck) {
    let i = state.decks.indexOf(deck)
    if(i > -1){
      state.decks.splice(i, 1)
    }
  },
  ["COPY_DECK"] (state, deck) {
    this.decks.push(deck)
  },
  ["LOAD_DECKS"] (state, card) {
    let local_decks = localStorage.getItem('decks')
    state.decks = !!local_decks ? JSON.parse(local_decks) : []
    // let local_selected_decks = localStorage.getItem('selectedDecks')
    // state.selectedDecks = !!local_selected_decks ? JSON.parse(local_selected_decks) : []
  },
  ["SAVE_DECKS"] (state, card) {
    localStorage.setItem('decks', JSON.stringify(state.decks))
    localStorage.setItem('selectedDecks', JSON.stringify(state.selectedDecks))
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
