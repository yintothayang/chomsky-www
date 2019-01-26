import config from '../firebaseConfig'
import firebase from 'firebase'

if(!firebase.apps.length){
  firebase.initializeApp(config)
}

// State
const state = {
  userBooks: [],
  libraryBooks: [],
  filters: {
    name: null,
    tags: null,
    advanced: true,
    basic: true,
  },
  version: "0.0.1"
}

// Getters
var getters = {
  usersBooks: state => state.userBooks,
  filteredUsersBooks: state => {
    let books = state.userBooks
    if(state.filters.name){
      books = books.filter(b => b.name.toLowerCase().includes(state.filters.name.toLowerCase()))
    }
    if(state.filters.tags){
      books = books.filter(b => b.tags.toLowerCase().includes(state.filters.tags.toLowerCase()))
    }
    if(!state.filters.basic){
      books = books.filter(b => b.type != 'basic')
    }
    if(!state.filters.advanced){
      books = books.filter(b => b.type != 'advanced')
    }
    return books
  },
  libraryBooks: state => state.libraryBooks,
  filteredLibraryBooks: state => {
    let books = state.libraryBooks
    if(state.filters.name){
      books = books.filter(b => b.name.toLowerCase().includes(state.filters.name.toLowerCase()))
    }
    if(state.filters.tags){
      books = books.filter(b => b.tags.toLowerCase().includes(state.filters.tags.toLowerCase()))
    }
    if(!state.filters.basic){
      books = books.filter(b => b.type != 'basic')
    }
    if(!state.filters.advanced){
      books = books.filter(b => b.type != 'advanced')
    }
    return books
  },
  filters: state => state.filters,
}

// Mutations
var mutations = {
  ["RESET"] (state) {
    state.userBooks = []
    state.libraryBooks = []
  },
  ["SET_USER_BOOKS"] (state, books) {
    state.userBooks = books
  },
  ["SET_LIBRARY_BOOKS"] (state, books) {
    state.libraryBooks = books
  },
  ["ADD_BOOK"] (state, book) {
    state.userBooks.push(book)
  },
  ["UPDATE_BOOK"] (state, book) {
    let book_to_update = state.userBooks.find(b => b.id === book.id)
    let i = state.userBooks.indexOf(book_to_update)
    if(i > -1){
      state.userBooks.splice(i, 1, book)
    } else {
      console.error("book not found while UPDATE_BOOK", book)
    }
  },
  ["DELETE_BOOK"] (state, book) {
    let book_to_delete = state.userBooks.find(b => b.id === book.id)
    let i = state.userBooks.indexOf(book_to_delete)
    if(i > -1){
      state.userBooks.splice(i, 1)
    }
  },
  ["REMOVE_LIBRARY_BOOK"] (state, book) {
    let book_to_delete = state.libraryBooks.find(b => b.id === book.id)
    let i = state.libraryBooks.indexOf(book_to_delete)
    if(i > -1){
      state.libraryBooks.splice(i, 1)
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
  fetchUserBooks: async ({commit, dispatch, rootState}) => {
    const firestore = firebase.firestore()
    firestore.settings({timestampsInSnapshots: true})
    let query = firestore.collection("books").where('owned_by', '==', rootState.users.activeUser.uid)
    let res = await query.get()
    let books = []
    res.forEach((doc) =>{
      let book = doc.data()
      // TODO remove hack, convert books
      if(typeof book.pages == "string"){
        book.pages = JSON.parse(book.pages)
      }
      book.id = doc.id
      books.push(book)
    })
    commit("SET_USER_BOOKS", books)

    // Start
    // books.forEach(book => {
    //   if(!book.pageKeys.length){
    //     book.pageKeys = Object.values(book.pageKeys)
    //   }
    //   console.log(book.pageKeys)
    //   dispatch("updateBook", book)
    // })
  },
  fetchLibraryBooks: async ({commit, rootState}) => {
    const firestore = firebase.firestore()
    firestore.settings({timestampsInSnapshots: true})
    let query = firestore.collection("books").where('public', '==', true)
    let res = await query.get()
    let books = []
    res.forEach((doc) =>{
      let book = doc.data()
      book.id = doc.id
      if(book.owned_by != rootState.users.activeUser.uid && book.created_by != rootState.users.activeUser.uid){
        books.push(book)
      }
    })
    commit("SET_LIBRARY_BOOKS", books)
  },
  createBook: async ({commit, rootState}, book) => {
    const firestore = firebase.firestore()
    firestore.settings({timestampsInSnapshots: true})
    book.created_by = rootState.users.activeUser.uid
    book.created_at = new Date().toJSON()
    book.owned_by = rootState.users.activeUser.uid
    book.version = rootState.books.version
    // Hack becasue firebase is lame
    const pages = book.pages
    book.pages = JSON.stringify(pages)
    return firestore.collection("books").add(book).then(res => {
      book.pages = pages
      book.id = res.id
      commit("ADD_BOOK", book)
    })
  },
  copyBook: async ({commit, rootState}, bookCopy) => {
    const firestore = firebase.firestore()
    firestore.settings({timestampsInSnapshots: true})
    let book = {
      original_id: bookCopy.id,
      owned_by: rootState.users.activeUser.uid,
      created_by:  bookCopy.created_by,
      name: bookCopy.name,
      pages: bookCopy.pages,
      public: true,
      type: bookCopy.type,
      version: bookCopy.version ? bookCopy.version: rootState.books.version,
      tags: bookCopy.tags ? bookCopy.tags : ""
    }
    return firestore.collection("books").add(book).then(res => {
      book.id = res.id
      commit("ADD_BOOK", book)
      commit("REMOVE_LIBRARY_BOOK", bookCopy)
    })
  },
  updateBook: async ({commit}, book) => {
    const firestore = firebase.firestore()
    firestore.settings({timestampsInSnapshots: true})

    // Hack because firebase is lame
    const pages = book.pages
    book.pages = JSON.stringify(pages)
    await firestore.collection("books").doc(book.id).update(book)
    book.pages = pages
    commit("UPDATE_BOOK", book)
    return book
  },
  deleteBook: async ({commit}, book) => {
    const firestore = firebase.firestore()
    firestore.settings({timestampsInSnapshots: true})
    return await firestore.collection("books").doc(book.id).delete().then(res => {
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
