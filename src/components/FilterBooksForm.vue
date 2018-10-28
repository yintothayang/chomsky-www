<template lang="pug">
#filter-books-form
  v-card-title
    span.headline Filter Books
  v-container(grid-list-md='')
    v-layout(wrap='')
      v-flex(xs12='', sm6='', md12='')
        v-text-field(label='Book Name' v-model="name")
      v-flex(xs12='', sm6='', md12='')
        v-text-field(label='Book Tags' v-model="tags")


</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'FilterBooksForm',
  watch: {
    $route: function(){
      this.updateFilters({
        name: null,
        tags: null,
        advanced: true,
        basic: true,
      })
    }
  },
  computed: {
    ...mapGetters({
      filters: 'books/filters',
    }),
    name: {
      get(){
        return this.filters.name
      },
      set(value){
        this.updateFilters({name: value})
      }
    },
    tags: {
      get(){
        return this.filters.tags
      },
      set(value){
        this.updateFilters({tags: value})
      }
    },

  },
  methods: {
    ...mapMutations({
      updateFilters: 'books/UPDATE_FILTERS',
    }),
  }
}
</script>


<style lang="stylus" scoped>
#filter-books-form
  background rgba(0, 0, 0, 0)
  .v-card__title
    padding-bottom 0px

  .container
    .v-input
      margin-top 8px

</style>
