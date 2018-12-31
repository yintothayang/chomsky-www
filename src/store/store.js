import Vue from 'vue'
import Vuex from 'vuex'

import users from './users'
import books from './books'
import tests from './tests'
import reports from './reports'

import components from './components'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    books,
    tests,
    reports,

    // Components
    navbar: components.navbar,
    leftnav: components.leftnav,
    rightnav: components.rightnav,
    modals: components.modals,
    toast: components.toast,
  },
})
