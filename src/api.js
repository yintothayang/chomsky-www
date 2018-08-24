import Vue from 'vue'
import firebase from 'firebase'
import functions from 'firebase/functions'

// CARDS
const cards = {
  add: async(data) => {
    return Vue.http.post(`${API_URL}/cards`, data).then(results=>{
      return results
    })
  },
  remove: async(data) => {
    return Vue.http.delete(`${API_URL}/cards`, data).then(results=>{
      return results
    })
  },
  update: async(data) => {
    return Vue.http.put(`${API_URL}/cards`, data).then(results=>{
      return results
    })
  },

  fetch: async(data) => {
    return Vue.http.get(`${API_URL}/cards`, data).then(results=>{
      return results
    })
  },

}

// DECKS
const decks = {
  fetch: async(data) => {
    return Vue.http.get(`${API_URL}/decks`, data).then(results=>{
      return results
    })
  },
  add: async(data) => {
    return Vue.http.post(`${API_URL}/decks`, data).then(results=>{
      return results
    })
  }
}

// GOOGLE
const google = {
  translate: async(text, target) => {
    let data = {
      text,
      target
    }
    let func = firebase.functions().httpsCallable("translate")
    return await func(data)
  }
}


export default {
  cards,
  decks,
  google
}
