// State
const state = {
  visible: false,
  message: null,
  duration: 2000,
}

// Getters
var getters = {
  visible: state => state.visible,
  message: state => state.message,
}

// Mutations
var mutations = {
  ['update_toast'] (state, {visible, message, duration}) {
    state.visible = visible
    state.message = message
    state.duration = duration
  },
}

// Actions
var actions = {
  toast: ({state, commit}, {message, duration = 2500}) =>{
    let toast = {
      visible: true,
      message: message,
      duration: duration,
    }
    commit('update_toast', toast)

    setTimeout(()=>{
      toast.visible = false
      toast.duration = 2000
      commit('update_toast', toast)
    }, toast.duration)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
