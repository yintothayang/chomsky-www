<template lang="pug">
#books-page
  .book-list(v-if="books.length && !loading")
    .book-container(v-for="book in books")
      .book(:class="{'selected': selectedBooks.includes(book)}")
        span.name {{book.name}}

        .book-actions-container
          v-btn(color="red" @click="deleteBook(book)" flat="") Delete
          router-link(:to="{name: 'edit-book', params: {id: book.id}}" tag="div")
            v-btn(color="blue" flat="") Edit
          router-link(:to="{name: 'game', params: {id: book.id}}" tag="div")
            v-btn(color="green" flat="") Play

  .empty(v-if="!books.length && !loading")
    span.none No Books Found
    v-btn(color="info" @click="$router.push({name: 'edit-book', params: {id: 'new'}})" large) Create a Book
    span.or or
    v-btn(color="info" @click="$router.push({name: 'library'})" large) Visit Library

  .actions-container
    .item.add-book
      router-link(:to="{name: 'edit-book', params: {id: 'new'}}" tag="div")
        v-tooltip(left)
          v-btn.on(small fab dark color="blue lighten-1" slot="activator")
            v-icon(dark) add
          span Create a Book
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
      books: 'books/books',
      selectedBooks: 'books/selectedBooks',
    }),
  },
  methods: {
    ...mapActions({
      fetchBooks: 'books/fetchBooks',
      deleteBook: 'books/deleteBook',
      createBook: 'books/createBook',
    }),
    ...mapMutations({
      setNavbarTitle: 'navbar/SET_TITLE',
      setSelected: 'books/SET_SELECTED',
      toggleSelected: 'books/TOGGLE_SELECTED',
    }),
    play(){
      this.$router.push({name: 'game'})
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
    this.setNavbarTitle("Books")
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
#books-page
  .book-list
    overflow-y scroll
    padding 1em 1.5em
    height 100%

    .book-container
      padding .2em 0em

      .book
        display flex
        padding 1em 2em .5em 2em
        margin .5em
        cursor pointer
        transition all .1s
        background white
        box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)
        user-select none
        flex-wrap wrap

        &:hover
          background lighten(orange, 80%)
        &.selected
          background lighten(orange, 20%)
          color white
          .v-btn
            color white !important

        .name
          font-size 1.4em
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
    flex-wrap wrap
    position absolute
    top 40%
    right 0em
    width 65px

    .item
      flex-basis 100%
      margin-bottom .5em

    .upload-book
      input
        display none

  .loading
    margin-top 8em
</style>
