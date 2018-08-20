<template lang="pug">
#edit-book-page
  h1 edit book



</template>

<script>

import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'EditBookPage',
  data() {
    return {
      book: {
        name: "New Book",
        pages: []
      }
    }
  },
  computed: {
    ...mapGetters({
      books: 'books/books'
    }),
  },
  methods: {
    ...mapActions({

    }),
    ...mapMutations({
      setNavbarTitle: 'navbar/SET_TITLE',
      deleteBook: 'books/DELETE_BOOK',
    }),
  },
  created(){
    let bookId = this.$route.params.id
    if(bookId === 'new'){

    } else {
      let book_to_edit = this.books.find(book => book.id === bookId)
      if(!book_to_edit){
        this.$router.push({name: 'books'})
      } else {
        this.book = Object.assign({}, book_to_edit)
      }
    }
    this.setNavbarTitle(this.book.name)
  }
}
</script>


<style lang="stylus" scoped>
#edit-book-page
  h1
    font-size 1em

</style>
