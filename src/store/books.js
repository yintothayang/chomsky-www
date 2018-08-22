import config from '../firebaseConfig'
import firebase from 'firebase'

if(!firebase.apps.length){
  firebase.initializeApp(config)
}



// State
const state = {
  books: [],
  selectedBooks: [],
  filters: {
    search: null,
    tags: [],
    booksPerRow: 'auto',
  },
  filteredBooks: [],
}

// Getters
var getters = {
  books: state => state.books,
  selectedBook: state => state.selectedBook,
  selectedBooks: state => state.selectedBooks,
  filters: state => state.filters,
}

// Mutations
var mutations = {
  ["SET_BOOKS"] (state, books) {
    state.books = books
  },
  ["ADD_BOOK"] (state, book) {
    state.books.push(book)
  },
  ["DELETE_BOOK"] (state, book) {
    let i = state.books.indexOf(book)
    if(i > -1){
      state.books.splice(i, 1)
    }
  },
  ["UPDATE_FILTERS"] (state, updates) {
    state.filters = Object.assign(state.filters, updates)
  },
  ["TOGGLE_SELECTED"] (state, book) {
    let i = state.selectedBooks.indexOf(book)
    if(i > -1){
      state.selectedBooks.splice(i, 1)
    } else {
      state.selectedBooks.push(book)
    }
  },
  ["SET_SELECTED"] (state, books=[]) {
    state.selectedBooks = books
  },
}

// Actions
var actions = {
  fetchBooks: async ({commit}) => {
    const firestore = firebase.firestore()
    firestore.settings({timestampsInSnapshots: true})
    let res = await firestore.collection("books").get()
    let books = []
    res.forEach((doc) =>{
      books.push(doc.data())
    })
    commit("SET_BOOKS", books)
  },
  createBook: async ({commit}, book) => {
    const firestore = firebase.firestore()
    firestore.settings({timestampsInSnapshots: true})
    let res = await firestore.collection("books").add(book)
  },
  updateBook: async ({commit}, book) => {

  },
  deleteBook: async ({commit}, book) => {

  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
