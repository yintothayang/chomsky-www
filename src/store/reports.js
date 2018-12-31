import config from '../firebaseConfig'
import firebase from 'firebase'

if(!firebase.apps.length){
  firebase.initializeApp(config)
}

// State
const state = {
  reports: [],
  currentReport: null
}

// Getters
var getters = {
  reports: state => state.reports,
  currentReport: state => state.currentReport,
}

// Mutations
var mutations = {
  ["UPDATE_CURRENT_REPORT"] (state, updates) {
    state.currentReport = Object.assign(state.currentReport, updates)
  },
  ["ADD_REPORT"] (state, report) {
    state.reports.push(report)
  },
  ["REMOVE_REPORT"] (state, report) {
    let i = state.reports.indexOf(report)
    if(i > -1){ state.reports.splice(i, 1) }
  },
  ["SET_REPORTS"] (state, reports) {
    state.reports = reports
  },
}

// Actions
var actions = {
  fetchReports: async ({commit}, filters) => {
    const firestore = firebase.firestore()
    firestore.settings({timestampsInSnapshots: true})
    let res = await firestore.collection("reports").get()
    let reports = []
    res.forEach((doc) =>{
      let report = doc.data()
      report.id = doc.id
      reports.push(report)
    })
    commit("SET_REPORTS", reports)
  },
  createReport: async ({commit, rootState}, report) => {
    const firestore = firebase.firestore()
    firestore.settings({timestampsInSnapshots: true})
    report.created_by = rootState.users.activeUser.uid
    report.created_at = new Date().toJSON()
    report.version = "0.0.1"
    await firestore.collection("reports").add(report).then(res => {
      report.id = res.id
      commit("ADD_REPORT", report)
    })
    return report
  },
  updateReport: async ({commit}, report) => {
    const firestore = firebase.firestore()
    firestore.settings({timestampsInSnapshots: true})
    await firestore.collection("reports").doc(report.id).update(report)
    commit("UPDATE_REPORT", report)
    return report
  },
  deleteReport: async ({commit}, report) => {
    const firestore = firebase.firestore()
    firestore.settings({timestampsInSnapshots: true})
    return await firestore.collection("report").doc(report.id).delete().then(res => {
      commit("REMOVE_REPORT", report)
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
