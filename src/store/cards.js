import API from '../api'

// State
const state = {
  cards: [],
  selectedCards: [],
}

// Getters
var getters = {
  cards: state => state.cards,
  selectedCards: state => state.cards.filter(card => card.selected),
}

// Mutations
var mutations = {
  ["SET_CARDS"] (state, cards) {
    state.cards = cards
  },
  ["ADD_CARD"] (state, card) {
    state.cards.push(card)
  },
  ["UPDATE_CARD"] (state, {card, updates}) {
    Object.assign(card, updates)
  },
  ["LOAD_CARDS"] (state, card) {
    let local_cards = localStorage.getItem('cards')
    state.cards = !!local_cards ? JSON.parse(local_cards) : []
  },
  ["SAVE_CARDS"] (state, card) {
    localStorage.setItem('cards', JSON.stringify(state.cards))
  },
}

// Actions
var actions = {
  fetchCards: ({commit}, data = {}) => {
    return API.cards.fetch(data).then(results => {
      commit("SET_CARDS", results.body)
      return results.body
    })
  },
  addCard: ({commit}, data = {}) => {
    return API.cards.add(data).then(results => {
      commit("ADD_CARD", results.body)
      return results.body
    })
  },
  removeCard: ({commit}, data = {}) => {
    return API.cards.remove(data).then(results => {
      commit("REMOVE_CARD", results.body)
      return results.body
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
