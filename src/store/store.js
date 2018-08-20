import Vue from 'vue'
import Vuex from 'vuex'

import users from './users'
import cards from './cards'
import decks from './decks'
import books from './books'
import game from './game'

import components from './components'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    cards,
    decks,
    books,
    game,

    // Components
    navbar: components.navbar,
    leftnav: components.leftnav,
    rightnav: components.rightnav,
    modals: components.modals,
  },
})
