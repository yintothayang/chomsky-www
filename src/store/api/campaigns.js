
import {crud, url} from './utils'

export default {
  ...crud(url("/trackers/hasoffers"), {
    // listCampaigns: 'get',
    createCampaign: 'post',
    // deleteCampaign: 'delete',
  }),
}
