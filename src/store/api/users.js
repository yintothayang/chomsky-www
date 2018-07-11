import Vue from 'vue'
import { crud, GET, url } from './utils'

export default {
  ...crud(url("/users"), {
    createUser: 'post',
    listUsers: 'get',
  }),
  ...crud(url("/users/<user_id>"), {
    updateUser: 'put',
    deleteUser: 'delete',
  }),
  ...crud(url("/users/request_password_reset"), {
    requestPasswordReset: 'post',
  }),
  ...crud(url("/users/reset_password"), {
    resetPassword: 'post',
  }),
  ...crud(url('users/self'), {
    getAuthedUser: 'get',
    deleteAuthedUser: 'delete',
  }),

  auth: (email, password)=>{
    let url_ = url("/auth")
    let data = {
      email,
      password
    }
    return Vue.http.post(url_, data)
  },

  loginAsUser: (userId) => {
    let url_ = url('users', userId, 'login_as')
    return Vue.http.post(url_)
  },

  setUserHeader(userId) {
    if(userId) {
      Vue.http.headers.common['X-Advertiser-ID'] = userId
    } else {
      delete Vue.http.headers.common['X-Advertiser-ID']
    }
  },

  setAuthAsUser(user) {
    if(user) {
      Vue.http.headers.common['Authorization'] = user.auth_token
    } else {
      delete Vue.http.headers.common['Authorization']
    }
  },
}
