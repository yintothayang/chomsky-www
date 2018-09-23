<template lang="pug">
#game-page
  .page-container(v-if="currentPage && !loading")
    .page
      span {{currentPage.front}}
  .text-input-container(v-if="mode === 'text' && !loading")
    text-input(:page="currentPage" @attempt="onAttempt" @success="onSuccess")
  .speech-input-container(v-if="mode === 'speech' && !loading")
    speech-input(:page="currentPage" @attempt="onAttempt" @success="onSuccess")

  .actions-container
    v-btn.on(small fab dark color="blue lighten-1" slot="activator" @click="showAnswer = !showAnswer")
      v-icon(dark) visibility

    v-btn.on(small fab dark color="blue lighten-1" slot="activator" @click="skip()")
      v-icon(dark) fast_forward


  .answer-modal(v-if="showAnswer")
    span {{currentPage.answer}}

  .load-container(v-if="loading")
    v-progress-circular.loading(:size="120" :width="10" color="blue" indeterminate)

</template>

<script>
import TextInput from '@/components/TextInput'
import SpeechInput from '@/components/SpeechInput'
import {mapActions, mapMutations, mapGetters} from 'vuex'
import API from '@/api'

export default {
  name: 'GamePage',
  components: {
    TextInput,
    SpeechInput,
  },
  data() {
    return {
      loading: true,
      showAnswer: false,
    }
  },
  computed: {
    ...mapGetters({
      lang: 'game/lang',
      dialect: 'game/dialect',
      mode: 'game/mode',
      pages: 'game/pages',
      books: 'books/books',
      selectedDeckPages: 'pages/selectedDeckPages',
    }),
    currentPage(){
      return this.pages[0]
    }
  },
  methods: {
    ...mapMutations({
      setNavbarTitle: 'navbar/SET_TITLE',
      setGamePages: 'game/SET_PAGES',
      shuffle: 'game/SHUFFLE_PAGES',
      nextPage: 'game/NEXT_PAGE',
      resetPages: 'game/RESET_PAGES',
    }),
    ...mapActions({
      fetchBooks: 'books/fetchBooks',
    }),
    onAttempt(answer){
      console.log("attempt", answer)
    },
    onSuccess(){
      if(this.pages.length > 1){
        this.nextPage()
      } else {
        this.nextPage()
        this.resetPages()
        this.shuffle()
      }
    },
    skip(){
      if(this.pages.length > 1){
        this.nextPage()
      } else {
        this.nextPage()
        this.resetPages()
        this.shuffle()
      }
    },
    async translatePages(pages){
      let promises = []
      pages.forEach(page => {
        if(page.back === '$translate'){
          promises.push(API.google.translate(page.front, this.dialect.substr(0, 2)).then(results =>{
            page.back = page.back
            page.answer = results.data[0]
          }))
        } else {
          page.answer = page.back
        }
      })
      await Promise.all(promises)
      return pages
    }
  },
  async created(){
    await this.fetchBooks()
    let book = this.books.find(book => book.id === this.$route.params.id)
    this.setNavbarTitle(book.name)

    let pages = await this.translatePages(book.pages)
    // let pages = book.pages
    this.setGamePages(JSON.parse(JSON.stringify(pages)))
    this.shuffle()
    this.loading = false
  }
}
</script>


<style lang="stylus">
#game-page
  display flex
  flex-direction column
  align-items center
  height auto !important

  .page-container
    display flex
    width 100%
    flex-basis 100%
    align-items center
    justify-content center
    margin-bottom 4em
    margin-top 4em

    .page
      font-size 3.5em
      padding .4em 0em
      flex-basis 80%
      background white
      box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)

  .text-input-container
    margin-bottom 1em
    width 60%

  .actions-container
    padding 0em 1em
    position absolute
    bottom 10%
    display flex
    justify-content space-between
    width 100%

  .answer-modal
    position absolute
    top 45%
    z-index 3
    background white
    box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)
    font-size 2em
    padding .3em .5em


</style>
