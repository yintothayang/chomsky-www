import { crud, url } from './utils'

export default {
  ...crud(url("/advertisers"), {
    listAdvertisers: 'get',
  }),
  ...crud(url("/advertiser_users"), {
    listAdvertiserUsers: 'get',
  }),  
}
