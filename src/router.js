import Vue from 'vue'
import Router from 'vue-router'
import Decks from './pages/Decks.vue'
import Cards from './pages/Cards.vue'
import Game from './pages/Game.vue'
import About from './pages/About.vue'

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
