<template lang="pug">
#top-nav
  v-toolbar(dark="" color="primary")
    v-toolbar-side-icon(@click="toggleLeftNav()")
    v-toolbar-title.white--text {{title}}
    v-spacer
    v-text-field(label="Search" single-line hide-details prepend-icon="search")
    v-spacer

</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'TopNav',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      title: 'navbar/title',
    })
  },
  methods: {
    ...mapMutations({
      toggleLeftNav: 'leftnav/TOGGLE_OPEN'
    })
  }
}
</script>


<style lang="stylus" scoped>
#top-nav
  h3
    margin 40px 0 0
</style>
