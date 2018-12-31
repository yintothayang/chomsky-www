<template lang="pug">
#books-page
  .book-list(v-if="books.length && !loading")
    .book-container(v-for="book in books")
      book(:book="book" @delete="onDeleteBook" @play="play")

  .empty(v-if="!books.length && !loading")
    span.none No Books Found
    v-btn(color="info" @click="setOpenModal('NewBookModal')" large) Create a Book
    span.or or
    v-btn(color="info" @click="$router.push({name: 'library'})" large) Visit Library

  .actions-container(v-if="books.length && !loading")
    .actions
      .item.add-book
        v-btn.on(dark small fab color="blue lighten-1" slot="activator" @click="setOpenModal('NewBookModal')")
          v-icon(dark) add

      .item.upload-book
        input(type="file" id="input" ref="fileUpload" multiple @change="onFilesUploaded()")
        v-tooltip(left)
          v-btn.on(small fab dark color="purple lighten-1" slot="activator" @click="upload()")
            v-icon(dark) cloud_upload
          span Upload a Book

  v-progress-circular.loading(:size="120" :width="10" color="blue" indeterminate v-if="loading")
</template>

<script>

import {mapActions, mapMutations, mapGetters} from 'vuex'
import Book from '@/components/Book'

export default {
  name: 'BooksPage',
  components: {
    Book,
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      activeUser: 'users/activeUser',
      books: 'books/filteredUsersBooks',
      tests: 'tests/tests',
    }),
  },
  methods: {
    ...mapActions({
      fetchBooks: 'books/fetchUserBooks',
      deleteBook: 'books/deleteBook',
      createBook: 'books/createBook',
      fetchTests: 'tests/fetchTests',
      createBasicTest: 'tests/createBasicTest',
    }),
    ...mapMutations({
      setNavbarTitle: 'navbar/SET_TITLE',
      setOpenModal: 'modals/SET_OPEN_MODAL',
      setModalOptions: 'modals/SET_OPTIONS',
      setToast: 'toast/SET_TOAST'
    }),
    async onDeleteBook(book){
      this.loading = true
      await this.deleteBook(book)
      this.setToast({message: "Book Deleted", open: true})
      this.loading = false
    },
    async play(book){
      if(book.type === "basic"){
        let test = this.tests.find(t => t.book_id === book.id)
        if(test){
          this.$router.push({name: 'test', params: {id: test.id}})
        } else {
          this.loading = true
          test = await this.createBasicTest(book)
          this.$router.push({name: 'test', params: {id: test.id}})
          this.loading = false
        }
      } else {
        this.setModalOptions(book)
        this.setOpenModal('CreateTestModal')
      }
    },
    upload(){
      this.$refs.fileUpload.click()
    },
    async onFilesUploaded(){
      this.loading = true
      let files = this.$refs.fileUpload.files
      let book = await this.fileToObject(files[0])

      await this.createBook(book)
      this.loading = false
    },
    async fileToObject(file){
      const FR = new FileReader()
      return new Promise((resolve, reject) => {
        FR.onerror = () => {
          FR.abort()
          reject(new DOMException("Problem parsing input file."))
        }
        FR.onload = (e) => {
          try {
            let obj = JSON.parse(e.target.result)
            resolve(obj)
          } catch(e) {
            reject(e)
          }
        }
        FR.readAsText(file)
      })
    }
  },
  async created(){
    if(!this.activeUser){
      this.$router.push({name: 'login'})
    } else {
      this.setNavbarTitle("Books")
      !this.tests.length ? this.fetchTests() : void(0)
      if(this.books.length < 2){
        this.loading = true
        await this.fetchBooks()
        this.loading = false
      }
    }
  }
}
</script>


<style lang="stylus" scoped>
#books-page
  height 100%
  display inline-table
  width 100%
  .book-list
    overflow-y auto
    padding 1em 1em 0em 1em
    height calc(100% - 52px - 2em)

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

  .actions-container
    display flex
    align-items center
    justify-content center
    bottom 10px
    width 100%
    margin-top 1em

    .actions
      display flex
      background white
      border-radius 50px
      box-shadow -1px 2px 2px 1px rgba(0, 0, 0, .05)

    .item
      margin 0em .3em

    .upload-book
      input
        display none

  .loading
    margin-top 8em
</style>
