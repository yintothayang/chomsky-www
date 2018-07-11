import Vue from 'vue'
import {crud, DELETE, POST, url } from './utils'

export default {
  ...crud(url("/trackers"), {
    listTrackers: 'get',
    createTracker: 'post',
  }),
  ...crud(url("/trackers/archive"), {
    deleteTracker: 'post',
  }),
  ...crud(url("/trackers/group"), {
    groupTrackers: 'get',
  }),
}
