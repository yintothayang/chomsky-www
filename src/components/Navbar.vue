<template lang="pug">
#navbar
  v-toolbar(dark="" color="primary")
    v-toolbar-side-icon.toggle(@click="toggleLeftNav()")
    v-spacer.hidden-md-and-up
    v-toolbar-title.white--text {{title}}
    v-spacer
    v-text-field.hidden-sm-and-down(v-model="local_filter" label="Search" single-line hide-details prepend-icon="search")
    v-spacer.hidden-sm-and-down
    v-icon(dark @click="openFilterModal()" v-if="$route.name == 'cards' || $route.name == 'decks'") filter_list
    v-icon(dark @click="openGameSettingsModal()" v-if="$route.name == 'game'") settings
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
      setOpenModal: 'modals/SET_OPEN_MODAL',
    }),
    openFilterModal(){
      if(this.$route.name == 'cards'){
        this.setOpenModal("FilterCardsModal")
      } else {
        this.setOpenModal("FilterDecksModal")
      }
    },
    openGameSettingsModal(){
      this.setOpenModal("GameSettingsModal")
    }
  }
}
</script>


<style lang="stylus" scoped>
#navbar
  .v-toolbar__title
    margin 0px
    line-height 1em
</style>
