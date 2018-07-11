import { crud, POST, GET, PUT, url, DELETE } from './utils'

export default {
  ...crud(url('teams'), {
    listTeams: 'get',
  }),
  ...crud(url('teams/<team_id>'), {
    updateTeam: 'put',
    deleteTeam: 'delete',
  }),
  ...crud(url('teams/<team_id>/users'), {
    fetchTeamUsers: 'get',
  }),
  ...crud(url('teams/<team_id>/users/<user_id>'), {
    fetchTeamUser: 'get',
    updateTeamUser: 'put',
    removeTeamUser: 'delete',
  }),
}
