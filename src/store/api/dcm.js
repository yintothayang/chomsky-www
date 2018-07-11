import { crud, GET, url, PUT } from './utils'

export default {
  ...crud(url("dcm/accounts"), {
    listAccounts: 'get',
  }),
  ...crud(url("dcm/accounts/<account_id>"), {
    updateAccount: 'put',
    deleteAccount: 'delete',
  }),
  ...crud(url("dcm/accounts/<account_id>/floodlight_activities"), {
    listFloodlightActivities: 'get',
  }),
  ...crud(url('dcm/team/accounts'), {
    listAccountsForTeam: 'get',
  }),
  ...crud(url('dcm/team/accounts/<account_id>/floodlight_activities'), {
    listFloodlightActivitiesForTeam: 'get',
  }),
}
