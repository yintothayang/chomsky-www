<template lang="pug">
#left-nav
  v-navigation-drawer(v-model="local_open" temporary="" absolute="")
    v-list(dense='')
      router-link.link(v-for='link in links' :key='link.title' :to="link.to" tag="div")
        v-list-tile
          v-list-tile-action
            v-icon {{ link.icon }}
          v-list-tile-content
            v-list-tile-title {{ link.title }}
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
      links: 'leftnav/links',
    }),
  },
  methods: {
    ...mapMutations({
      setOpen: 'leftnav/SET_OPEN'
    })
  }
}
</script>


<style lang="stylus" scoped>
#left-nav
  .link
    &:hover
      background rgba(0, 0, 0, .07)

  .router-link-active
    background rgba(0, 0, 0, .15)
</style>
