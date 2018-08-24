// State
const state = {
  mode: 'text',
  lang: '日本語',
  dialect: 'ja-JP',
  pages: [],
  pile: [],
}

// Getters
var getters = {
  mode: state => state.mode,
  lang: state => state.lang,
  dialect: state => state.dialect,
  pages: state => state.pages,
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
  ["SET_PAGES"] (state, pages) {
    state.pages = pages
  },
  ["NEXT_PAGE"] (state) {
    state.pile.push(state.pages.shift())
  },
  ["PREVIOUS_PAGE"] (state) {
    state.pages.push(state.pile.shift())
  },
  ["RESET_PAGES"] (state) {
    state.pages = state.pile
    state.pile = []
  },
  ["SHUFFLE_PAGES"] (state) {
    var currentIndex = state.pages.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = state.pages[currentIndex]
      state.pages[currentIndex] = state.pages[randomIndex]
      state.pages[randomIndex] = temporaryValue
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
