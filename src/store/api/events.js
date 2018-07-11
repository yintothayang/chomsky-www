import { crud, url } from './utils'

export default {
  ...crud(url("/events"), {
    listEvents: 'get',
  }),
}
