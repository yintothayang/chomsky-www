<template lang="pug">
#books-page
  .book-list(v-if="books.length && !loading")
    .book-container(v-for="book in books")
      .book
        .top
          span.name {{book.name}}

        .bottom
          v-btn(color="red" @click="onDeleteBook(book)" flat="") Delete
          router-link(:to="{name: 'edit-book', params: {id: book.id}}" tag="div")
            v-btn(color="blue" flat="") Edit
          v-btn(color="green" flat="" @click="play(book)") Play

  .empty(v-if="!books.length && !loading")
    span.none No Books Found
    v-btn(color="info" @click="setOpenModal('NewBookModal')" large) Create a Book
    span.or or
    v-btn(color="info" @click="$router.push({name: 'library'})" large) Visit Library

  .actions-container
    .item.add-book
      v-btn.on(small fab dark color="blue lighten-1" slot="activator" @click="setOpenModal('NewBookModal')")
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
export default {
  name: 'BooksPage',
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      activeUser: 'users/activeUser',
      books: 'books/usersBooks',
      tests: 'tests/tests',
    }),
  },
  methods: {
    ...mapActions({
      fetchBooks: 'books/fetchBooks',
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
  .book-list
    overflow-y auto
    padding 1em
    height 90%

    .book-container
      padding .2em 0em

      .book
        display flex
        margin-bottom .5em
        cursor pointer
        transition all .1s
        background white
        box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)
        user-select none
        flex-wrap wrap

        .top
          display flex
          flex-basis 100%
          margin-bottom .5em
          padding .8em 1em 0em 1em
          .name
            font-size 1.2em
            font-weight 600
            flex-basis 100%
            text-align left
          .pages
            font-size 1em
            font-weight 500
            flex-basis 100%
            text-align left

        .bottom
          display flex
          justify-content space-around
          align-items center
          flex-basis 100%
          padding 0em 0em .8em 0em
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
    top 90%
    width 100%

    .item
      flex-basis 100%
      margin-bottom .5em

    .upload-book
      input
        display none

  .loading
    margin-top 8em
</style>
