<template lang="pug">
#edit-book-page
  v-form.book(v-if="!loading")
    .name-container
      v-text-field.name(v-model="book.name" label="Name" :hide-details="true")
      v-switch(label="public" v-model="book.public" :hide-details="true")

    .tags-container
      v-text-field.tags(v-model="book.tags" label="Tags" :hide-details="true")

    .pages-container
      .top
        span.label Pages
        .left
          v-btn.edit(small color="white" @click="openPageKeysModal()" v-if="book.type === 'advanced'")
            v-icon(dark color="purple") edit
          v-btn.add(small color="white" @click="addPage()")
            v-icon(dark color="green") add

      transition-group.pages(mode="out-in" name="fade" tag="div")
        .page-holder(v-for="(page, pageIndex) in book.pages" :key="book.pages.indexOf(page)")

            .page.basic(v-if="book.type != 'advanced'")
              v-text-field.front(v-model="page[0].value" label="Front")
              v-text-field.back(v-model="page[1].value" label="Back")
              .action
                v-btn(small color="white" @click="deletePage(page)")
                  v-icon(dark color="red lighten-1") clear

            .page.advanced(v-else)
              .page-rows
                .page-row(v-for="item in page")
                  v-text-field.value(v-model="item.value" :label="item.name" :hide-details="true")
              .action
                v-btn(small color="white" @click="deletePage(page)")
                  v-icon(dark color="red lighten-1") clear

    .actions-container
      v-tooltip(left)
        v-btn(small fab dark color="blue lighten-1" @click="save()" slot="activator")
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
      pageKeys: [
        {
          name: "new key",
          type: "string"
        },
      ],
      book: {
        name: "New Book",
        pages: [],
      },
    }
  },
  computed: {
    ...mapGetters({
      books: 'books/usersBooks'
    }),
  },
  methods: {
    ...mapActions({
      updateBook: 'books/updateBook',
      createBook: 'books/createBook',
      fetchBooks: 'books/fetchUserBooks',
    }),
    ...mapMutations({
      setNavbarTitle: 'navbar/SET_TITLE',
      setToast: 'toast/SET_TOAST',
      setOpenModal: 'modals/SET_OPEN_MODAL',
      setModalOptions: 'modals/SET_OPTIONS',
    }),
    openPageKeysModal(){
      this.setModalOptions({pageKeys: this.pageKeys, book: this.book})
      this.setOpenModal('PageKeysModal')
    },
    addPage(){
      let page = []
      if(this.book.type === 'basic'){
        page.push({name: 'front', value: ""})
        page.push({name: 'back', value: ""})
      } else {
        // TODO different key types
        this.pageKeys.forEach(key => {
          page.push({name: key.name, value: ""})
        })
      }
      this.book.pages.push(page)
      console.log(this.book.pages)
    },
    deletePage(page){
      this.book.pages.splice(this.book.pages.indexOf(page), 1)
    },
    async save(){
      this.loading = true
      if(this.book.type === "basic"){
        this.book.pageKeys = [
          {name: "front", type: "string"},
          {name: "back", type: "string"}
        ]
      } else {
        this.book.pageKeys = this.pageKeys
      }
      this.book.id ? await this.updateBook(this.book) : await this.createBook(this.book)
      this.loading = false
      this.setToast({message: "Book Saved!", open: true})
      this.$router.push({name: 'books'})
    },
  },
  async created(){
    const bookId = this.$route.params.id
    if(bookId === 'new_basic' || bookId === 'new_advanced'){
      bookId === 'new_basic' ? this.book.type = 'basic' : this.book.type = 'advanced'
      this.addPage()
    } else {
      if(!this.books.length){
        this.loading = true
        await this.fetchBooks()
        this.loading = false
      }
      let foundBook = this.books.find(book => book.id === bookId)
      if(foundBook){
        this.pageKeys = Object.assign({}, foundBook.pageKeys)
        this.book = Object.assign({}, foundBook)
      } else {
        this.$router.push({name: 'books'})
      }
    }
    this.setNavbarTitle(this.book.name)
  }
}
</script>


<style lang="stylus" scoped>
#edit-book-page
  padding 1em
  height 100%
  width 100%

  .book
    position relative
    box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)
    padding 1em
    background white
    height 100%

  form
    height 100%

  .name-container
    padding-bottom .5em
    display flex
    .name
      margin-right 3em

  .tags-container
    margin-bottom 1em

  .pages-container
    flex-wrap wrap
    height 70%
    overflow-y hidden
    display table
    text-align left
    margin-bottom 1em
    width 100%

    .top
      display flex
      align-items center
      font-size 1.1em
      font-weight 400

      .left
        margin-left auto

      button
        margin 0px
        min-width 0px
        margin-left 1em
        i
          font-size 1.5em
        &.add
          i
            font-weight 600

  .pages
    overflow-y auto
    padding-top .5em
    padding-bottom 1em
    height 100%
    flex-grow 1

    .page-holder
      display flex
      margin-bottom 1em
      box-shadow -1px 1px 2px 1px rgba(0, 0, 0, .05)
    .page
      padding 0em 0em 0em .5em
      border 1px solid rgba(0, 0, 0, .15)
      position relative
      display flex
      align-items center
      flex-basis 100%

      &.advanced
        display flex
        .page-rows
          flex-basis 100%
          display flex
          flex-wrap wrap
          padding-bottom 1em

          .page-row
            margin-bottom .5em

      &.basic
        .front
          margin-right .5em

        .back
          margin-left .5em

      .action
        margin-left 1em
        height 100%
        display flex
        align-items center
        border-left 1px solid rgba(0, 0, 0, .1)

        button
          min-width 0px
          height 100%
          margin 0px
          border 0px
          border-radius 0px
          box-shadow none

          i
            font-size 1.4em


      .page-row
        display flex
        flex-basis 100%

        .page-row-actions
          display flex
          align-items center
          justify-content center

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
