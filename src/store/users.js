import firebase from 'firebase'
// const db = firebase.firestore()

// State
const state = {
  activeUser: null
}

// Getters
var getters = {
  activeUser: state => state.activeUser,
}

// Mutations
var mutations = {
  ["UPDATE_ACTIVE_USER"] (state, updates) {
    state.activeUser = Object.assign(state.activeUser, updates)
  },
}

// Actions
var actions = {
  signup: async ({commit}, data) => {
    console.log(data)
    let results = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password).catch((e) =>{

    })

    console.log("results: ", results)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
