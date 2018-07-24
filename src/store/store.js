import Vue from 'vue'
import Vuex from 'vuex'

import cards from './cards'
import decks from './decks'

import components from './components'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cards: cards,
    decks: decks,

    // Components
    navbar: components.navbar,
    leftnav: components.leftnav,
    modals: components.modals,
  },
})
