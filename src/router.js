import Vue from 'vue'
import Router from 'vue-router'
import Decks from './pages/DecksPage.vue'
import Cards from './pages/CardsPage.vue'
import Game from './pages/GamePage.vue'
import About from './pages/AboutPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/decks'
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
