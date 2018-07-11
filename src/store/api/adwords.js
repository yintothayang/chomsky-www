import { crud, POST, GET, PUT, url } from './utils'

export default {
  ...crud(url('adwords/accounts'), {
    listAccounts: 'get',
  }),
  ...crud(url('adwords/accounts/<account_id>'), {
    updateAccount: 'put',
    deleteAccount: 'delete',
  }),
  ...crud(url('adwords/accounts/<account_id>/conversion_trackers'), {
    fetchCustomerConversionTrackers: 'get',
  }),
  ...crud(url('adwords/team/accounts'), {
    listAccountsForTeam: 'get',
  }),
  ...crud(url('adwords/team/accounts/<account_id>/conversion_trackers'), {
    fetchCustomerConversionTrackersForTeam: 'get',
  }),
}
