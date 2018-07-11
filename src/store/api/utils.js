import Vue from 'vue'
import store from '@/store'

let refreshingToken = false
let replayRequests = []

let requestMethod = function requestMethod(method, key='body'){
  return (url, body)=>{
    let deferred = Promise.$defer()
    let headers = {}
    let request = {
      method,
      url,
      [key]: body,
      headers,
      before(request){
        // give the promise the request so that we can abort it
        deferred.promise.request = request
      }
    }
    Vue.http(request).then(response => deferred.resolve(response), error => deferred.reject(error))
    return deferred.promise.then(response => {
      return response
    }, error => {
      // If our auth_token expired attempt to refresh it, and then replay request
      if(!refreshingToken){
        if((error.body.type == "ExpiredTokenException" || error.body.type == "InvalidTokenException") && store.state.users.activeUser){
          refreshingToken = true
          refreshToken()
          let d = Promise.$defer();
          let original = d.promise.then(()=>{
            return requestMethod(method, key)(url, body)
          });
          replayRequests.push(d)
          return original
        } else {
          throw error
        }
      } else {
        // If we are currently attempting a token refresh, defer request
        let d = Promise.$defer();
        let req = d.promise.then(()=>{
          return requestMethod(method, key)(url, body)
        });
        // create a deferred promise with a `.then` method to resend the request
        // returning that promise 'injects' it into the promise chain
        // push the deferred object onto the stack so they can be replayed later
        replayRequests.push(d);
        return req;
      }
    })
  }
}

let refreshToken = function(){
  let activeUser = store.state.users.activeUser
  delete Vue.http.headers.common['Authorization'];
  let data = {
    refresh_token: activeUser.loggedInAs ? activeUser.loggedInAs.refresh_token : activeUser.refresh_token
  }
  return Vue.http.post(`${CONFIG.rootUrl}/auth/refresh`, data).then((results)=>{
    let tokens = {
      auth_token: results.body.auth_token,
      refresh_token:results.body.refresh_token
    }
    if(activeUser.loggedInAs){
      let loggedInAs = Object.assign({}, activeUser.loggedInAs, tokens)
      store.dispatch("users/setActiveUser", Object.assign({}, activeUser, loggedInAs))
    } else {
      store.dispatch("users/setActiveUser", Object.assign({}, activeUser, tokens))
    }
    for(let defer of replayRequests){
      defer.resolve();
    }
    // we are done resolving requests sent during a refreshing period, reset static vars
    refreshingToken = false;
    replayRequests = [];
  }, error =>{
    console.error('refresh fail:', error);
    // Need to re-login
    store.dispatch('games/clearState', null)
    store.dispatch('teams/clearState', null)
    store.dispatch('users/setActiveUser', null)
    window.location = "/login"
    throw error
  })
}


export let GET = requestMethod('GET', 'params')
export let POST = requestMethod('POST')
export let PUT = requestMethod('PUT')
export let DELETE = requestMethod('DELETE', 'params')

let call = function call(method, url, data){
  switch (method) {
    case 'get':
    case 'GET':
      return GET(url, data)
    case 'post':
    case 'POST':
      return POST(url, data)
    case 'put':
    case 'PUT':
      return PUT(url, data)
    case 'delete':
    case 'DELETE':
      return DELETE(url, data)
  }
}

export function crud(rawUrl, options){
  const regex = /<(.*?)>/g
  return Object.keys(options).reduce((obj, name)=>{
    let method = options[name]
    // We parse the url for param variables in the form of `path/users/<user_id>/other`
    // and use those params to determine how many of the arguments should be used to replace them
    const params = rawUrl.match(regex) || []
    obj[name] = (...args)=>{
      const pArgs = args.splice(0, params.length) // take the number of args we need from the begining
      const [data] = args.slice(-1) // extract the data as the last element of the leftover args
      const populatedUrl = params.reduce((_url, param, ix) => _url.replace(param, pArgs[ix]), rawUrl)
      return call(method, populatedUrl, data)
    }
    return obj
  }, {})
}

export function url(...parts){
  let [firstPart] = parts
  return `${CONFIG.rootUrl}${firstPart.startsWith('/') ? '' : '/'}${parts.join('/')}`
}
