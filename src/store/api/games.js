import { crud, PUT, POST, GET, DELETE, url } from './utils'

export default {
  ...crud(url("/games"), {
    listGames: 'get',
    addGame: 'post',
  }),
  ...crud(url("/games/<game_id>"), {
    updateGame: 'put',
  }),
  ...crud(url("/games/<game_id>/security"), {
    updateGameSecurity: 'put',
  }),
  ...crud(url("/games/<game_id>/do_not_track"), {
    updateGameDoNotTrackList: 'put',
  }),
  ...crud(url("/games/<game_id>/retention"), {
    updateGameDataRetention: 'put',
  }),
  ...crud(url("/games/<game_id>/users"), {
    getGameUsers: 'get',
  }),
  ...crud(url("/games/<game_id>/users/<user_id>"), {
    updateGameUser: 'put',
    removeGameUser: 'delete',
  }),
  ...crud(url("/games/<game_id>/users/invite"), {
    inviteUser: 'post',
  }),
  ...crud(url("/games/<game_id>/teams"), {
    getGameTeams: 'get',
    createTeam: 'post',
  }),
  ...crud(url("/games/join"), {
    joinGame: 'post',
  }),
}
