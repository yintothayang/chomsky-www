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
      v-flex(xs12='', sm6='', md12='')
        span.type Type
      v-flex(xs6='', sm6='', md6='')
        v-switch(label="basic" v-model="basic" :hide-details="true")
      v-flex(xs6='', sm6='', md6='')
        v-switch(label="advanced" v-model="advanced" :hide-details="true")
  .reset-container
    v-btn(dark color="blue accent-3" @click="reset()") reset
</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'FilterBooksForm',
  watch: {
    $route: function(){
      this.reset()
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
    basic: {
      get(){
        return this.filters.basic
      },
      set(value){
        this.updateFilters({basic: value})
      }
    },
    advanced: {
      get(){
        return this.filters.advanced
      },
      set(value){
        this.updateFilters({advanced: value})
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
    reset(){
      this.updateFilters({
        name: null,
        tags: null,
        advanced: true,
        basic: true,
      })
    }
  }
}
</script>


<style lang="stylus" scoped>
#filter-books-form
  position relative
  background rgba(0, 0, 0, 0)
  .v-card__title
    padding-bottom 0px

  .container
    .v-input
      margin-top 8px

  .reset-container
    position fixed
    bottom 1em
    width 100%
    button
      width 90%
</style>
