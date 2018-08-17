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
Vue.http.headers.common['Content-Type'] = "application/json"

// Load cards and decks from localStorage
store.commit('cards/LOAD_CARDS')
store.commit('decks/LOAD_DECKS')

import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyBeXUpuVfJSD4QDEp4hhjWDM_0w_5F1g18",
    authDomain: "einstein-213121.firebaseapp.com",
    databaseURL: "https://einstein-213121.firebaseio.com",
    projectId: "einstein-213121",
    storageBucket: "einstein-213121.appspot.com",
    messagingSenderId: "27920995926"
}
firebase.initializeApp(config)


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
