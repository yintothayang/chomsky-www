import firebase from 'firebase'

// State
const state = {
  activeUser: null //firebase.auth().currentUser
}

// Getters
var getters = {
  activeUser: state => state.activeUser,
}

// Mutations
var mutations = {
  ["SET_ACTIVE_USER"] (state, user) {
    state.activeUser = user
  },
}

// Actions
var actions = {
  signup: async ({commit}, data) => {
    return firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(results => {
      commit("SET_ACTIVE_USER", results)
    })
  },
  login: async ({commit}, data) => {
    return await firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(results => {
      commit("SET_ACTIVE_USER", results)
    })
  },
  logout: async ({commit}) => {
    return await firebase.auth().signOut().then(results => {
      commit("SET_ACTIVE_USER", null)
    }).catch((e) =>{

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
