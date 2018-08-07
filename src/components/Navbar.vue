<template lang="pug">
v-toolbar#navbar(dark="" color="primary")
  v-toolbar-side-icon.toggle(@click="toggleLeftNav()")
  v-spacer.hidden-md-and-up
  v-toolbar-title.white--text {{title}}
  v-spacer
  v-text-field.hidden-sm-and-down(v-model="search" label="Search" single-line hide-details prepend-icon="search")
  v-spacer.hidden-sm-and-down
  v-icon(dark @click="openRightNav()" v-if="$route.name == 'cards' || $route.name == 'decks'") filter_list
  v-icon(dark @click="openGameSettingsModal()" v-if="$route.name == 'game'") settings
</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'Navbar',
  computed: {
    ...mapGetters({
      title: 'navbar/title',
      cardFilters: 'cards/filters',
    }),
    search: {
      get(){
        if(this.$route.name == 'cards'){
          return this.cardFilters.search
        } else {
          // TODO
          // return this.deckFilters.search
        }
      },
      set(value){
        if(this.$route.name == 'cards'){
          this.updateCardFilters({search: value})
        } else {
          // TODO
          // this.updateFilters({search: value})
        }
      }
    },
  },
  methods: {
    ...mapMutations({
      toggleLeftNav: 'leftnav/TOGGLE_OPEN',
      setFilter: 'navbar/SET_FILTER',
      setOpenModal: 'modals/SET_OPEN_MODAL',
      toggleRightNav: 'rightnav/TOGGLE_OPEN',
      setRightNavForm: 'rightnav/SET_FORM',
      updateCardFilters: 'cards/UPDATE_FILTERS',
    }),
    openRightNav(){
      if(this.$route.name == 'cards'){
        this.setRightNavForm('FilterCardsForm')
        this.toggleRightNav()
      } else {
        this.setRightNavForm('FilterDecksForm')
        this.toggleRightNav()
      }
    },
    openGameSettingsModal(){
      this.setRightNavForm('GameSettingsForm')
      this.toggleRightNav()
    }
  }
}
</script>


<style lang="stylus" scoped>
#navbar
  background-image: url("/images/noise.png"), -webkit-radial-gradient(top center, #f88f14, #f15a24 )
  .v-toolbar__title
    margin 0px
    font-size 1.7em
    line-height 1em
</style>
