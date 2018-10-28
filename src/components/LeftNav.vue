<template lang="pug">
#left-nav
  v-navigation-drawer(v-model="local_open" temporary="" absolute="")
    v-list(dense='')
      router-link.link(v-for='link in links' :key='link.title' :to="link.to" tag="div")
        v-list-tile
          v-list-tile-action
            v-icon(:color="link.color") {{ link.icon }}
          v-list-tile-content
            v-list-tile-title.title {{ link.title }}
    v-list.logout(dense='')
      .link(@click="onLogout()")
        v-list-tile
          v-list-tile-action
            v-icon(color="green") exit_to_app
          v-list-tile-content
            v-list-tile-title.title Logout


</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'LeftNav',
  data() {
    return {
      local_open: false
    }
  },
  watch: {
    local_open: function(new_value){
      this.setOpen(new_value)
    },
    open: function(new_value){
      this.local_open = new_value
    },
  },
  computed: {
    ...mapGetters({
      open: 'leftnav/open',
    }),
    links(){
      return [
        { title: 'Books', icon: 'book', to: {name: 'books'}, color: "blue"},
        { title: 'Library', icon: 'local_library', to: {name: 'library'}, color: "purple"},
        // { title: 'Tests', icon: 'description', to: {name: 'tests'}, color: "green"},
        { title: 'Help', icon: 'contact_support', to: {name: 'about'}, color: "red" },
      ]
    }
  },
  methods: {
    ...mapMutations({
      setOpen: 'leftnav/SET_OPEN',
      resetBooks: 'books/RESET',
      resetTests: 'tests/RESET',
    }),
    ...mapActions({
      logout: 'users/logout',
    }),
    async onLogout(){
      await this.logout()
      this.resetBooks()
      this.resetTests()
      this.$router.push({name: 'login'})
    }
  }
}
</script>


<style lang="stylus" scoped>
#left-nav
  .link
    padding 1em 0em

    i
      font-size 2.5em

    .v-list__tile__title
      font-size 1.4em
      font-weight 600
    &:hover
      background rgba(0, 0, 0, .07)

  .router-link-active
    background rgba(0, 0, 0, .15)

  .v-list
    padding 0px

    .title
      line-height 1.3em !important
      color rgba(0, 0, 0, .7)

  .logout
    margin-top 2em
</style>
