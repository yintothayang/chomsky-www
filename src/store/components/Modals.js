// State
const state = {
  openModal: null,
  options: {},
}

// Getters
const getters = {
  openModal: state => state.openModal,
  options: state => state.options,
}

// Mutations
const mutations = {
  ['SET_OPEN_MODAL'] (state, openModal) {
    state.openModal = openModal
  },
  ['SET_OPTIONS'] (state, options) {
    state.options = options
  },
  ['UPDATE_OPTIONS'] (state, options) {
    state.options = Object.assign({}, state.options, options)
  },
}

// Actions
const actions = {
  setOpenModal: ({state, commit}, {modal, options={}}={}) => {
    commit('SET_OPEN_MODAL', modal)
    commit('SET_OPTIONS', options)
  },
  setModalOptions: ({state, commit}, options={}) => {
    commit('SET_OPTIONS', options)
  },
  updateModalOptions: ({state, commit}, options={}) => {
    commit('UPDATE_OPTIONS', options)
  },
  closeModal: ({state, dispatch, commit}) => {
    return dispatch('setOpenModal')
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
