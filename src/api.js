import Vue from 'vue'
const API_URL = "http://localhost:3000"
const GOOGLE_API_KEY = "AIzaSyBfHrwMrbB3KtRmg1W74NCw8MrHc47Nx8g"

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
  translate: async(text, sourceLang, targetLang) => {
    let data = {
      q: text,
      source: sourceLang,
      target: targetLang,
      format: 'text',
    }
    return Vue.http.post("https://translation.googleapis.com/language/translate/v2", data).then(results=>{
      return results
    })
  }
}


export default {
  cards,
  decks,
  google
}
