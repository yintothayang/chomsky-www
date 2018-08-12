// State
const state = {
  mode: 'text',
  lang: '日本語',
  dialect: 'ja-JP',
  cards: [],
  pile: [],
}

// Getters
var getters = {
  mode: state => state.mode,
  lang: state => state.lang,
  dialect: state => state.dialect,
  cards: state => state.cards,
}

// Mutations
var mutations = {
  ["SET_MODE"] (state, mode) {
    state.mode = mode
  },
  ["SET_LANG"] (state, lang) {
    state.lang = lang
  },
  ["SET_DIALECT"] (state, dialect) {
    state.dialect = dialect
  },
  ["SET_CARDS"] (state, cards) {
    state.cards = cards
  },
  ["NEXT_CARD"] (state) {
    state.pile.push(state.cards.shift())
  },
  ["PREVIOUS_CARD"] (state) {
    state.cards.push(state.pile.shift())
  },
  ["RESET_CARDS"] (state) {
    state.cards = state.pile
    state.pile = []
  },
  ["SHUFFLE_CARDS"] (state) {
    var currentIndex = state.cards.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = state.cards[currentIndex]
      state.cards[currentIndex] = state.cards[randomIndex]
      state.cards[randomIndex] = temporaryValue
    }
  },
}

// Actions
var actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
