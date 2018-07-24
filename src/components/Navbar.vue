<template lang="pug">
#navbar
  v-toolbar(dark="" color="primary")
    v-toolbar-side-icon(@click="toggleLeftNav()")
    v-toolbar-title.white--text {{title}}
    v-spacer
    v-text-field(v-model="local_filter" label="Search" single-line hide-details prepend-icon="search")
    v-spacer
    v-icon(dark @click="openFilterModal()" v-if="$route.name == 'cards' || $route.name == 'decks'") filter_list
</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'Navbar',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      title: 'navbar/title',
      filter: 'navbar/filter',
    }),
    local_filter: {
      get(){
        return this.filter
      },
      set(e){
        this.setFilter(e)
      }
    },
  },
  methods: {
    ...mapMutations({
      toggleLeftNav: 'leftnav/TOGGLE_OPEN',
      setFilter: 'navbar/SET_FILTER',
    }),
    openFilterModal(){
      if(this.$route.name == 'cards'){
        // TODO create modal store
      } else {
        // TODO create modal store
      }
    }
  }
}
</script>


<style lang="stylus" scoped>
#navbar
  h3
    margin 40px 0 0
</style>
