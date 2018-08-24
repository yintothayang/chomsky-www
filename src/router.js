import Vue from 'vue'
import Router from 'vue-router'

import Home from './pages/HomePage.vue'
import Signup from './pages/SignupPage.vue'
import Login from './pages/LoginPage.vue'
import Books from './pages/BooksPage.vue'
import EditBook from './pages/EditBookPage.vue'
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
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/books',
      name: 'books',
      component: Books
    },
    {
      path: '/books/:id',
      name: 'edit-book',
      component: EditBook
    },
    {
      path: '/library',
      name: 'library',
      component: Library
    },
    {
      path: '/game/:id',
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
