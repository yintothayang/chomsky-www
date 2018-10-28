<template lang="pug">
v-toolbar#navbar(dark="" color="blue accent-3")
  v-toolbar-side-icon.toggle(@click="toggleLeftNav()" v-if="activeUser")
  v-spacer.hidden-md-and-up
  v-toolbar-title.white--text {{title}}
  v-spacer
  v-spacer.hidden-sm-and-down
  v-icon(dark @click="openRightNav()" v-if="$route.name == 'books' || $route.name == 'library'") filter_list
  v-icon(dark @click="openTestSettingsModal()" v-if="$route.name == 'test'") settings
</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'Navbar',
  computed: {
    ...mapGetters({
      activeUser: 'users/activeUser',
      title: 'navbar/title',
    }),
  },
  methods: {
    ...mapMutations({
      toggleLeftNav: 'leftnav/TOGGLE_OPEN',
      toggleRightNav: 'rightnav/TOGGLE_OPEN',
    }),
    openRightNav(){
      this.toggleRightNav()
    },
    openTestSettingsModal(){
      this.toggleRightNav()
    }
  }
}
</script>


<style lang="stylus" scoped>
#navbar
  .v-toolbar__title
    margin 0px
    font-size 1.8em
    font-family 'Raleway', sans-serif
    font-weight 500


</style>
