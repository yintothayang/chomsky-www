import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'


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
