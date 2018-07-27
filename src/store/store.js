import Vue from 'vue'
import Vuex from 'vuex'

import cards from './cards'
import decks from './decks'
import game from './game'

import components from './components'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cards: cards,
    decks: decks,
    game:  game,

    // Components
    navbar: components.navbar,
    leftnav: components.leftnav,
    modals: components.modals,
  },
})
