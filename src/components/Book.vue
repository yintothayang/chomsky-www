<template lang="pug">
.book
  .left
    span.name {{book.name}}
  .right
    v-speed-dial(v-model='open', transition='slide-y-reverse-transition' direction="bottom")
      v-btn(slot='activator' v-model='open' color='blue darken-2' fab flat)
        v-icon.open expand_more
        v-icon.close close

      v-btn(color="red" @click="onDeleteBook(book)" fab dark small)
        v-icon delete
      v-btn(fab dark small color='green')
        v-icon edit

      v-btn(fab dark small color='indigo')
        v-icon add

        //- v-btn(fab='', dark='', small='', color='red')
        //-   v-icon delete



    //- router-link(:to="{name: 'edit-book', params: {id: book.id}}" tag="div")
    //-   v-btn(color="blue" flat="") Edit
    //- v-btn(color="green" flat="" @click="play(book)") Play


</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'Book',
  data(){
    return {
      open: false
    }
  },
  props: {
    book: {
      default: ()=>{}
    }
  },
  computed: {
    ...mapGetters({

    }),
  },
  methods: {
    ...mapMutations({
      updateFilters: 'decks/UPDATE_FILTERS',
    }),
  }
}
</script>


<style lang="stylus">
.book
  display flex
  padding 0em
  margin-bottom .5em
  cursor pointer
  transition all .1s
  background white
  box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)
  user-select none

  .left
    display flex
    flex-wrap wrap
    padding 1em 1em
    flex-basis 80%

    .top
      flex-basis 100%
      text-align left
      font-size .8em
      .name
        font-size 1.4em
        font-weight 600
        flex-basis 100%
        text-align left
    .bottom
      .pages
       font-size .8em
       font-weight 500
      .tags
        display flex

  .right
    flex-basis 20%
    display flex
    align-items center
    justify-content center
    border-left 1px solid rgba(0, 0, 0, .15)

    .open
      font-size 2.2em

    .close
      font-size 1.6em

    .v-speed-dial__list
      z-index 2

    .copy
      flex-basis 100%
      height 100%
      margin 0px
      padding 0px
      font-weight 600
      font-size 1.1em
      min-width 0px
</style>
