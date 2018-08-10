import Vue from 'vue'
import Router from 'vue-router'

import Home from './pages/HomePage.vue'
import Decks from './pages/DecksPage.vue'
import Cards from './pages/CardsPage.vue'
import Library from './pages/LibraryPage.vue'
import Game from './pages/GamePage.vue'
import About from './pages/AboutPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/decks',
      name: 'decks',
      component: Decks
    },
    {
      path: '/cards',
      name: 'cards',
      component: Cards
    },
    {
      path: '/library',
      name: 'library',
      component: Library
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
