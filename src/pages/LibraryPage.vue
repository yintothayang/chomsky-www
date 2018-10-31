<template lang="pug">
#library-page
  .book-list(v-if="books.length && !loading")
    .book-container(v-for="book in books")
      book(:book="book" @copy="onCopyBook" :is-library="true")
  .empty(v-if="!books.length && !loading")
    span.none No Books Found
    v-btn(color="info" @click="setOpenModal('NewBookModal')" large) Create a Book

  v-progress-circular.loading(:size="120" :width="10" color="blue" indeterminate v-if="loading")
</template>

<script>

import {mapActions, mapMutations, mapGetters} from 'vuex'
import Book from '@/components/Book'
export default {
  name: 'LibraryPage',
  components: {
    Book,
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      books: 'books/filteredLibraryBooks',
    }),
  },
  methods: {
    ...mapActions({
      fetchBooks: 'books/fetchLibraryBooks',
      copyBook: 'books/copyBook',
    }),
    ...mapMutations({
      setNavbarTitle: 'navbar/SET_TITLE',
      setOpenModal: 'modals/SET_OPEN_MODAL',
      setToast: 'toast/SET_TOAST'
    }),
    async onCopyBook(book){
      this.loading = true
      await this.copyBook(book)
      this.setToast({message: "Book Added!", open: true})
      this.loading = false
    }
  },
  created(){
    this.setNavbarTitle("Library")
    this.$nextTick(()=> {
      if(this.books){
        this.loading = true
        this.fetchBooks().then(()=>{this.loading = false})
      }
    })
  }
}
</script>


<style lang="stylus" scoped>
#library-page
  height 100%
  display inline-table
  width 100%
  .book-list
    overflow-y auto
    padding 1em
    height 100%

    .book-container
      padding .2em 0em

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


  .loading
    margin-top 8em

</style>
