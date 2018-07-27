import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'

Vue.config.productionTip = false

// Load cards and decks from localStorage
store.commit('cards/LOAD_CARDS')
store.commit('decks/LOAD_DECKS')

// Save cards and decks from localStorage before leaving
window.onbeforeunload = function(e) {
  // store.commit('cards/SAVE_CARDS')
  // store.commit('decks/SAVE_DECKS')
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
