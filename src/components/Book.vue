<template lang="pug">
.book-list-item
  .left
    .top
      span.name {{book.name}}
      span.pages {{book.pages.length}} pages
    .bottom
      .tags(v-if="book.tags")
        span.tag(v-for="tag in book.tags.split(' ')") {{tag}}
      span.type {{book.type}}
  .right
    v-speed-dial(v-model='open', transition='slide-y-reverse-transition' direction="bottom")
      v-btn(slot='activator' v-model='open' color='blue darken-2' fab flat)
        v-icon.open expand_more
        v-icon.close close

      v-btn(color="deep-orange darken-1" @click="$emit('delete', book)" fab dark small)
        v-icon delete

      router-link(:to="{name: 'edit-book', params: {id: book.id}}" tag="div")
        v-btn(fab dark small color='indigo')
          v-icon edit

      v-btn(fab dark small color='green' @click="$emit('play', book)")
        v-icon play_arrow

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
.book-list-item
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
    padding 1em 1em .5em 1em
    flex-basis 80%

    .top
      display flex
      flex-basis 100%
      line-height 1em
      margin-bottom .2em
      .name
        font-size 1.1em
        font-weight 600
        text-align left

      .pages
        margin-left auto
        font-size .9em
        font-weight 600

    .bottom
      display flex
      flex-basis 100%
      align-items center
      .tags
        display flex
        flex-basis 100%
        align-items center

        .tag
          background rgba(0, 0, 0, .08)
          margin-right .5em
          padding .5em .8em
          border-radius 1px
          font-weight 600
          font-size .8em
          line-height .8em

      .type
        margin-left auto
        font-weight 500
        font-size .8em

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
