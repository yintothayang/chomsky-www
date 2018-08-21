<template lang="pug">
#edit-book-page
  v-form.book
    transition-group(mode="out-in" name="fade")
      .page(v-for="page in book.pages" :key="book.pages.indexOf(page)")
        v-text-field.front(v-model="page.front" label="Front")
        v-text-field.back(v-model="page.back" label="Back")
        .action(v-if="book.pages.length > 1")
          v-tooltip(top)
            v-btn.on(fab dark small color="red lighten-1" @click="deletePage(page)" slot="activator")
              v-icon(dark) remove
            span Delete

    .add-page
      v-tooltip(top)
        v-btn.on(dark small color="green lighten-1" @click="addPage()" slot="activator")
          v-icon(dark) add
        span Add

    .actions-container
      v-tooltip(left)
        v-btn.on(fab dark color="blue lighten-1" @click="saveBook()" slot="activator")
          v-icon(dark) save
        span Save Book

</template>

<script>

import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'EditBookPage',
  data() {
    return {
      book: {
        name: "New Book",
        pages: [
          {
            front: "",
            back: ""
          },
        ]
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
    addPage(){
      this.book.pages.push({
        front: "",
        back: ""
      })
    },
    deletePage(page){
      this.book.pages.splice(this.book.pages.indexOf(page), 1)
    },
    saveBook(){
      console.log("TODO: ")
    }
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
  padding 2em
  .book
    position relative
    box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)
    padding 1em
    background white
    height 100%

    .page
      padding 0em 1em
      margin-bottom 1em
      border 1px solid rgba(0, 0, 0, .1)
      display flex
      align-items center

      .front
        margin-right .5em

      .back
        margin-left .5em

      .action
        margin-left 2em

  .actions-container
    position absolute
    bottom 10px
    display flex
    right 0px

    .v-tooltip
      display block
      margin-left auto
      margin-right auto


</style>