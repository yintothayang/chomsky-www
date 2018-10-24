<template lang="pug">
#edit-book-page
  v-form.book(v-if="!loading")
    .name-container
      v-text-field.name(v-model="book.name" label="Name" :hide-details="true")
      v-switch(label="public" v-model="book.public" :hide-details="true")

    .tags-container
      v-text-field.tags(v-model="book.tags" label="Tags" :hide-details="true")

    .pages-container
      span.label.pages-label Pages
      transition-group.pages(mode="out-in" name="fade" tag="div")
        .page-holder(v-for="(page, pageIndex) in book.pages" :key="book.pages.indexOf(page)")
          .page.basic(v-if="book.type != 'advanced'")
            v-text-field.front(v-model="page.front" label="Front")
            v-text-field.back(v-model="page.back" label="Back")
            .action(v-if="book.pages.length > 1")
              v-tooltip(top)
                v-btn.on(fab dark flat small color="red lighten-1" @click="deletePage(page)" slot="activator")
                  v-icon(dark) remove_circle_outline
                span Delete
          .page.advanced(v-else)
            .page-row(v-for="(value, key, index) in page")
              v-text-field.key(v-model="bookKeys[pageIndex][index]" label="key")
              v-text-field.value(v-model="page[key]" label="value")
              .page-row-actions
                v-btn.delete-page-key(dark small flat icon color="red lighten-1" @click="deletePageKey(page, key)" slot="activator" v-if="Object.keys(page).length > 1")
                  v-icon(dark) remove_circle_outline

            .page-actions
              v-tooltip.action(top)
                v-btn.on(dark flat small color="green lighten-1" @click="addPageKey(page, pageIndex)" slot="activator")
                  v-icon(dark) add
                span Add Field
              v-tooltip.action(top)
                v-btn.on(dark flat small color="blue lighten-1" @click="copyPage(page, bookKeys[pageIndex])" slot="activator")
                  v-icon(dark) autorenew
                span Copy Page
              v-tooltip.action(top)
                v-btn.on(dark flat small color="red lighten-1" @click="deletePage(page)" slot="activator")
                  v-icon(dark) remove_circle_outline
                span Delete Page

    .add-page
      v-btn.on(dark small color="green lighten-1" @click="addPage()" slot="activator")
        v-icon(dark) add

    .actions-container
      v-tooltip(left)
        v-btn.on(fab dark color="blue lighten-1" @click="save()" slot="activator")
          v-icon(dark) save
        span Save Book
  v-progress-circular.loading(:size="120" :width="10" color="blue" indeterminate v-if="loading")
</template>

<script>

import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'EditBookPage',
  data() {
    return {
      loading: false,
      book: {
        name: "New Book",
        pages: []
      },
      bookKeys: []
    }
  },
  computed: {
    ...mapGetters({
      books: 'books/books'
    }),
    valid(){
      if(this.book.pages.length){
        let valid = true
        let last = Object.keys(this.book.pages[0])
        this.book.pages.forEach(page => {
          let current = Object.keys(page)
          if(JSON.stringify(last) != JSON.stringify(current)){
            valid = false
          }
        })
        return valid
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions({
      deleteBook: 'books/DELETE_BOOK',
      updateBook: 'books/updateBook',
      createBook: 'books/createBook',
      fetchBooks: 'books/fetchBooks',
    }),
    ...mapMutations({
      setNavbarTitle: 'navbar/SET_TITLE',
      setToast: 'toast/SET_TOAST',
    }),
    copyPage(page, bookKeys){
      this.bookKeys.push(bookKeys.slice())
      this.book.pages.push(Object.assign({}, page))
    },
    addPage(){
      let page = {}
      let i = this.book.pages.length
      if(this.book.type === 'basic'){
        page.front = ""
        page.back = ""
      } else {
        page['key' + i] = "value" + i
        this.bookKeys.push(["key" + i])
      }
      this.book.pages.push(page)
    },
    addPageKey(page, pageIndex){
      let i = Object.keys(page).length
      this.$set(page, 'key' + i, 'value' + i)
      this.bookKeys[pageIndex].push("key" +i)
    },
    deletePage(page){
      this.bookKeys.splice(this.book.pages.indexOf(page), 1)
      this.book.pages.splice(this.book.pages.indexOf(page), 1)
    },
    deletePageKey(page, key){
      this.bookKeys[this.book.pages.indexOf(page)].splice(this.bookKeys[this.book.pages.indexOf(page)].indexOf(key), 1)
      this.$delete(page, key)
    },
    async save(){
      if(this.valid){
        this.loading = true
        this.book.type === 'advanced' ? this.saveAdvanced() : void(0)
        this.book.id ? await this.updateBook(this.book) : await this.createBook(this.book)
        this.loading = false
        this.$router.push({name: 'books'})
      } else {
        this.setToast({message: "Every Page must have the same Keys", open: true})
      }
    },
    saveAdvanced(){
      let pages = []
      let i = 0
      this.book.pages.forEach(page => {
        pages.push({})
        let j = 0
        Object.keys(page).forEach(key => {
          pages[i][this.bookKeys[i][j]] = page[key]
          j++
        })
        i++
      })
      this.book.pages = pages
    },
    initAdvanced(){
      let i = 0
      this.book.pages.forEach(page => {
        this.bookKeys.push([])
        Object.keys(page).forEach(key => {
          this.bookKeys[i].push(key)
        })
        i++
      })
    }
  },
  async created(){
    let bookId = this.$route.params.id
    if(bookId != 'new_basic' && bookId != 'new_advanced'){
      if(!this.books.length){
        this.loading = true
        await this.fetchBooks()
        this.loading = false
      }
      let book_to_edit = this.books.find(book => book.id === bookId)
      if(!book_to_edit){
        this.$router.push({name: 'books'})
      } else {
        this.book = Object.assign({}, book_to_edit)
        this.book.type === 'advanced' ? this.initAdvanced() : void(0)
        this.loading = false
      }
    } else {
      bookId === 'new_basic' ? this.book.type = 'basic' : this.book.type = 'advanced'
      this.addPage()
    }
    this.setNavbarTitle(this.book.name)
  }
}
</script>


<style lang="stylus" scoped>
#edit-book-page
  padding 1em
  .book
    position relative
    box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)
    padding 1em
    background white
    height 100%

  .name-container
    padding-bottom .5em
    display flex
    .name
      margin-right 3em

  .tags-container
    margin-bottom 1em

  .pages-container
    display flex
    flex-wrap wrap
    height 75%
    overflow-y hidden

    .pages-label
      flex-basis 100%
      text-align left
      font-size 1.1em
      font-weight 400
  .pages
    overflow-y auto
    padding-top .5em
    padding-bottom 1em
    height 100%
    flex-grow 1

    .page-holder
      display flex

    .page
      padding 0em 1em
      margin-bottom 1em
      border 1px solid rgba(0, 0, 0, .1)
      display flex
      align-items center
      flex-basis 100%

      &.advanced
        flex-wrap wrap
        .key
          margin-right .5em
        .value
          margin-right .5em
        .action
          flex-basis 100%

      &.basic
        .front
          margin-right .5em

        .back
          margin-left .5em

        .action
          margin-left 2em

      .page-row
        display flex
        flex-basis 100%

        .page-row-actions
          display flex
          align-items center
          justify-content center

      .page-actions
        display flex
        flex-basis 100%
        align-items center
        justify-content space-around

  .actions-container
    position absolute
    bottom 10px
    display flex
    right 0px

    .v-tooltip
      display block
      margin-left auto
      margin-right auto

  .loading
    margin-top 8em
</style>
