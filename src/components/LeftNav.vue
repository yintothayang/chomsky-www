<template lang="pug">
  v-navigation-drawer(v-model="open" temporary="" absolute="")
    v-list.pa-1
      v-list-tile(avatar="")
        v-list-tile-content
          v-list-tile-title Chomsky
    v-list.pt-0(dense="")
      v-divider
      v-list-tile(v-for="item in links" :key="item.title")
        router-link(:to="item.to")
          v-list-tile-action
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title {{ item.title }}
</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'LeftNav',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      isOpen: 'leftnav/open',
      links: 'leftnav/links'
    }),
    open: {
      // getter
      get: function () {
        return this.isOpen
      },
      // setter
      set: function (newValue) {
        // this.toggleLeftNav()
      }
    }
  },
  methods: {
    ...mapMutations({
      toggleLeftNav: 'leftnav/TOGGLE_OPEN'
    })
  }
}
</script>


<style lang="stylus" scoped>
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
