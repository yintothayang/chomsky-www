import {crud, url} from './utils'

export default {
  ...crud(url("/stats"), {
    getStats: 'post'
  }),
  ...crud(url("/stats/graph"), {
    getGraphStats: 'get'
  }),
}
