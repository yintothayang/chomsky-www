<template lang="pug">
#books-page
  .book-list(v-if="books.length")
    .book-container(v-for="book in books" @click="toggleSelected(book)")
      .book(:class="{'selected': selectedBooks.includes(book)}")
        span.name {{book.name}}
        span.card-count {{book.card_ids.length}} card(s)

        .book-actions-container
          v-btn(color="orange" @click="deleteBook(book)" flat="") Delete

  .empty(v-else)
    span.none No Books Found
    v-btn(color="info" @click="$router.push({name: 'edit-book', params: {id: 'new'}})" large) Create a Book
    span.or or
    v-btn(color="info" @click="$router.push({name: 'library'})" large) Visit Library

  .actions-container
    .item.create-card-button(@click="play()" v-if="selectedBooks.length")
      v-btn.on(fab dark large color="green")
        v-icon(dark) play_arrow


</template>

<script>

import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'BooksPage',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      books: 'books/books',
      selectedBooks: 'books/selectedBooks',
    }),
  },
  methods: {
    ...mapActions({

    }),
    ...mapMutations({
      setNavbarTitle: 'navbar/SET_TITLE',
      addCard: 'cards/ADD_CARD',
      deleteBook: 'books/DELETE_BOOK',
      setSelected: 'books/SET_SELECTED',
      toggleSelected: 'books/TOGGLE_SELECTED',
    }),
    play(){
      this.$router.push({name: 'game'})
    }
  },
  created(){
    this.setNavbarTitle("Books")
  }
}
</script>


<style lang="stylus" scoped>
#books-page
  .book-list
    overflow-y scroll
    display flex
    flex-wrap wrap
    padding 2em

    .book-container
      display flex
      flex-basis 100%
      padding 1em 0em
      justify-content center
      align-items center

      .book
        display flex
        padding 1em 2em .5em 2em
        margin .5em
        flex-grow 1
        cursor pointer
        transition all .1s
        background white
        box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)
        user-select none
        flex-basis 100%
        flex-wrap wrap

        &:hover
          background lighten(orange, 80%)
        &.selected
          background lighten(orange, 20%)
          color white
          .v-btn
            color white !important

        .name
          font-size 1.8em
          font-weight 600
          flex-basis 100%
          text-align left
        .card-count
          font-size 1em
          font-weight 500
          flex-basis 100%
          text-align left

        .book-actions-container
          display flex
          justify-content flex-end
          align-items center
          flex-basis 100%

          button
            margin 0px
            padding 0px

  .empty
    padding 5em 1em
    display flex
    flex-wrap wrap
    align-items center
    justify-content center

    span.none
      font-weight 600
      font-size 1.8em
      flex-basis 100%
      margin-bottom 2em
      color rgba(0, 0, 0, .6)
    span.or
      flex-basis 100%
      font-weight 600
      font-size 1.2em

  .actions-container
    display flex
    position absolute
    top 85%
    right 1em

</style>
