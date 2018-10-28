import config from '../firebaseConfig'
import firebase from 'firebase'

if(!firebase.apps.length){
  firebase.initializeApp(config)
}

// Defaults
const DEFAULTS = {
  mode: 'text',
  lang: '日本語',
  dialect: 'ja-JP',
  autoStart: true,
}

// State
const state = {
  currentTest: null,
  tests: [],
  pageIndex: 0,
}

// Getters
var getters = {
  currentTest: state => state.currentTest,
  tests: state => state.tests,
  pageIndex: state => state.pageIndex,
  currentPage: state => state.currentTest ? state.currentTest.pages[state.pageIndex] : null,
  mode: state => (state.currentTest && state.currentTest.mode) ? state.currentTest.mode : DEFAULTS.mode,
  lang: state => (state.currentTest && state.currentTest.lang) ? state.currentTest.lang : DEFAULTS.lang,
  dialect: state => (state.currentTest && state.currentTest.dialect) ? state.currentTest.dialect : DEFAULTS.dialect,
  autoStart: state => (state.currentTest && state.currentTest.autoStart) ? state.currentTest.autoStart : DEFAULTS.autoStart,
}

// Mutations
var mutations = {
  ["RESET"] (state) {
    state.tests = []
    state.currentTest = null
  },
  ["SET_CURRENT_TEST"] (state, test) {
    state.currentTest = test
  },
  ["UPDATE_CURRENT_TEST"] (state, updates) {
    state.currentTest = Object.assign(state.currentTest, updates)
  },
  ["ADD_TEST"] (state, test) {
    state.tests.push(test)
  },
  ["REMOVE_TEST"] (state, test) {
    let i = state.tests.indexOf(test)
    if(i > -1){ state.tests.splice(i, 1) }
  },
  ["UPDATE_TEST"] (state, test) {
    let test_to_update = state.tests.find(b => b.id === test.id)
    let i = state.tests.indexOf(test_to_update)
    if(i > -1){
      state.tests.splice(i, 1, test)
    } else {
      console.error("test not found while UPDATE_TEST", test)
    }
  },
  ["SET_PAGE_INDEX"] (state, index) {
    state.pageIndex = index
  },
  ["SET_TESTS"] (state, tests) {
    state.tests = tests
  },
  ["PREVIOUS_PAGE"] (state) {
    state.pageIndex--
  },
  ["NEXT_PAGE"] (state) {
    state.pageIndex++
  },
  ["SHUFFLE"] (state) {
    let pages = state.currentTest.pages
    var currentIndex = pages.length, temporaryValue, randomIndex
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = pages[currentIndex]
      pages[currentIndex] = pages[randomIndex]
      pages[randomIndex] = temporaryValue
    }
  },
}

// Actions
var actions = {
  fetchTests: async ({commit}, filters) => {
    const firestore = firebase.firestore()
    firestore.settings({timestampsInSnapshots: true})
    let res = await firestore.collection("tests").get()
    let tests = []
    res.forEach((doc) =>{
      let test = doc.data()
      test.id = doc.id
      tests.push(test)
    })
    commit("SET_TESTS", tests)
  },
  createTest: async ({commit, rootState}, test) => {
    const firestore = firebase.firestore()
    firestore.settings({timestampsInSnapshots: true})
    test.created_by = rootState.users.activeUser.uid
    test.created_at = new Date().toJSON()
    test.owned_by = rootState.users.activeUser.uid
    test.version = "0.0.1"
    await firestore.collection("tests").add(test).then(res => {
      test.id = res.id
      commit("ADD_TEST", test)
    })
    return test
  },
  createBasicTest: async ({commit, dispatch, rootState}, book) => {
    let test = {
      name: book.name,
      mode: 'text',
      lang: '日本語',
      dialect: 'ja-JP',
      autoStart: true,
      book_id: book.id,
      pages: book.pages.map(page => {
        return {
          front: {
            question: page.front,
          },
          back: {
            answer: page.back,
          }
        }
      })
    }
    await dispatch('createTest', test)
    return test
  },
  updateTest: async ({commit}, test) => {
    const firestore = firebase.firestore()
    firestore.settings({timestampsInSnapshots: true})
    await firestore.collection("tests").doc(test.id).update(test)
    commit("UPDATE_TEST", test)
    return test
  },
  deleteTest: async ({commit}, test) => {
    const firestore = firebase.firestore()
    firestore.settings({timestampsInSnapshots: true})
    return await firestore.collection("test").doc(test.id).delete().then(res => {
      commit("REMOVE_TEST", test)
    })
  },
  attempt: ({state, getters}, attempt) => {
    let currentAnswer = getters.currentPage.back.answer
    let result = {state: null}
    if(attempt.mode === 'text'){
      if(attempt.input.toLowerCase() === currentAnswer.toLowerCase()){
        result.state = "success"
      } else if(attempt.input.length >= currentAnswer.length){
        result.state = "fail"
      }
    } else {

    }
    // console.log("result: ", result)
    return result
  },

    // async translatePages(pages){
    //   let promises = []
    //   pages.forEach(page => {
    //     if(page.back === '$translate'){
    //       promises.push(API.google.translate(page.front, this.dialect.substr(0, 2)).then(results =>{
    //         page.back = page.back
    //         page.answer = results.data[0]
    //       }))
    //     } else {
    //       page.answer = page.back
    //     }
    //   })
    //   await Promise.all(promises)
    //   return pages
    // }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
