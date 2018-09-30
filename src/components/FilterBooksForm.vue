<template lang="pug">
#filter-decks-modal
  v-card-title
    span.headline Filter Decks
  v-container(grid-list-md='')
    v-layout(wrap='')
      v-flex(xs12='', sm6='', md12='')
        v-text-field(label='Search' v-model="search")
      v-flex(xs12='', sm6='', md12='')
        v-select(v-model="decksPerRow" :items="['auto', 1, 2, 3, 4, 5, 'max']" label="Decks per row")


</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'FilterDecksForm',
  data(){
    return {
      card: {}
    }
  },
  computed: {
    ...mapGetters({
      filters: 'decks/filters',
    }),
    search: {
      get(){
        return this.filters.search
      },
      set(value){
        this.updateFilters({search: value})
      }
    },
    decksPerRow: {
      get(){
        return this.filters.decksPerRow
      },
      set(value){
        this.updateFilters({decksPerRow: value})
      }
    },
  },
  methods: {
    ...mapMutations({
      updateFilters: 'decks/UPDATE_FILTERS',
    }),
  }
}
</script>


<style lang="stylus" scoped>
#filter-decks-form
  background rgba(0, 0, 0, 0)
  .v-card__title
    padding-bottom 0px

  .container
    .v-input
      margin-top 8px
</style>
