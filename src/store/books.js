import API from '../api'
import uuid from 'uuid/v4'

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
  fetchBooks: ({commit}, data = {}) => {
    return API.books.fetch(data).then(results => {
      commit("SET_BOOKS", results.body)
      return results.body
    })
  },
  createBook: ({commit}, data = {}) => {
    return API.books.add(data).then(results => {
      commit("ADD_BOOK", results.body)
      return results.body
    })
  },
  updateBook: ({commit}, data = {}) => {
    return API.books.add(data).then(results => {
      commit("ADD_BOOK", results.body)
      return results.body
    })
  },
  deleteBook: ({commit}, data = {}) => {
    return API.books.add(data).then(results => {
      commit("ADD_BOOK", results.body)
      return results.body
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
