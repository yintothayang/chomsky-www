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
  ["UPDATE_BOOK"] (state, book) {
    let i = state.books.indexOf(book)
    if(i > -1){
      state.books[i] = book
    } else {
      console.error("book not found while UPDATE_BOOK", book)
    }
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
      let book = doc.data()
      book.id = doc.id
      books.push(book)
    })
    commit("SET_BOOKS", books)
  },
  createBook: async ({commit, rootState}, book) => {
    const firestore = firebase.firestore()
    firestore.settings({timestampsInSnapshots: true})
    book.created_by = rootState.users.activeUser.uid
    book.created_at = new Date().toJSON()
    book.owned_by = rootState.users.activeUser.uid
    book.version = "0.0.1"
    return firestore.collection("books").add(book).then(res => {
      book.id = res.id
      commit("ADD_BOOK", book)
    })
  },
  updateBook: async ({commit}, book) => {
    const firestore = firebase.firestore()
    firestore.settings({timestampsInSnapshots: true})
    return firestore.collection("books").doc(book.id).update(book)
    commit("UPDATE_BOOK", book)
  },
  deleteBook: async ({commit}, book) => {
    const firestore = firebase.firestore()
    firestore.settings({timestampsInSnapshots: true})
    return firestore.collection("books").doc(book.id).delete().then(res => {
      commit("DELETE_BOOK", book)
    })

  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
