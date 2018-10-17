import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import VueResource from 'vue-resource'

import firebase from 'firebase'
import config from './firebaseConfig'

if(!firebase.apps.length){
  firebase.initializeApp(config)
}

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.http.headers.common['Content-Type'] = "application/json"


firebase.auth().onAuthStateChanged(user => {
  store.commit('users/SET_ACTIVE_USER', user)
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
