<template lang="pug">
#test-page
  .page-container(v-if="currentPage && !loading" v-touch="{left: () => skip(), right: () => previous()}")
    .face-container(@click="front = !front")
      transition(name="component-fade" mode="out-in")
        .face(v-if="front")
          img(v-if="currentPage.front.image" :src="currentPage.front.image")
          span(v-if="currentPage.front.value") {{currentPage.front.value}}
        .face(v-if="!front")
          img(v-if="currentPage.back.image" :src="currentPage.back.image")
          span(v-if="currentPage.back.value") {{currentPage.back.value}}

  .text-input-container(v-if="mode === 'text' && !loading")
    text-input(:page="currentPage" :state="state" @attempt="onAttempt" @success="onSuccess")
  .speech-input-container(v-if="mode === 'speech' && !loading")
    speech-input(:page="currentPage" @attempt="onAttempt" @success="onSuccess")


  //- .actions-container(v-if="currentPage")
  //-   .actions
  //-     v-btn(small fab dark color="green lighten-1" slot="activator" @click="previous()")
  //-       v-icon(dark) fast_rewind

  //-     v-btn(small fab dark color="purple lighten-1" slot="activator" @click="playAudio()"  v-if="currentPage && currentPage.$audio && currentPage.$audio.length && currentPage.$audio.charAt(0) === 'h'")
  //-       v-icon(dark) volume_up

  //-     v-btn(small fab dark color="blue lighten-1" slot="activator" @click="showAnswer = !showAnswer")
  //-       v-icon(dark) visibility

  //-     v-btn(small fab dark color="green lighten-1" slot="activator" @click="skip()")
  //-       v-icon(dark) fast_forward

  .answer-modal(v-if="showAnswer")
    span {{currentPage.back.value}}

  .load-container(v-if="loading")
    v-progress-circular.loading(:size="120" :width="10" color="blue" indeterminate)

  audio(ref="audio" :src="currentPage.$audio" v-if="currentPage && currentPage.$audio && currentPage.$audio.length && currentPage.$audio.charAt(0) === 'h'")


</template>

<script>
import TextInput from '@/components/TextInput'
import SpeechInput from '@/components/SpeechInput'
import {mapActions, mapMutations, mapGetters} from 'vuex'
import API from '@/api'

export default {
  name: 'TestPage',
  components: {
    TextInput,
    SpeechInput,
  },
  data() {
    return {
      loading: false,
      front: true,
      showAnswer: false,
      state: null,
      book: null,
    }
  },
  computed: {
    ...mapGetters({
      activeUser: 'users/activeUser',
      test: 'tests/currentTest',
      tests: 'tests/tests',
      books: 'books/filteredUsersBooks',
      currentPage: 'tests/currentPage',
      pageIndex: 'tests/pageIndex',
      mode: 'tests/mode',
    }),
  },
  methods: {
    ...mapMutations({
      setNavbarTitle: 'navbar/SET_TITLE',
      setCurrentTest: 'tests/SET_CURRENT_TEST',
      previousPage: 'tests/PREVIOUS_PAGE',
      nextPage: 'tests/NEXT_PAGE',
      randomize: 'tests/RANDOMIZE_PAGES',
      resetPages: 'tests/RESET_PAGES',
      shuffle: 'tests/SHUFFLE',
      setPageIndex: 'tests/SET_PAGE_INDEX',
    }),
    ...mapActions({
      fetchTests: 'tests/fetchTests',
      fetchBooks: 'books/fetchUserBooks',
      attempt: 'tests/attempt',
    }),
    async onAttempt(attempt){
      // console.log("attempt", attempt)
      let result = await this.attempt(attempt)
      this.state = result.state
      if(this.state === "success"){
        this.onSuccess()
      }
      // if(this.state === "fail"){
      //   this.onFail()
      // }
    },
    onSuccess(){
      this.skip()
    },
    skip(){
      if((this.test.pages.length - 1) === this.pageIndex){
        this.shuffle()
        this.setPageIndex(0)
      } else {
        this.nextPage()
      }
    },
    previous(){
      if(0 === this.pageIndex){
        this.shuffle()
        this.setPageIndex(0)
      } else {
        this.previousPage()
      }
    },
    playAudio(){
      if(this.$refs.audio){
        this.$refs.audio.play()
      }
    },
  },
  async created(){
    this.loading = true

    let promises = []
    if(!this.tests.length) promises.push(this.fetchTests())
    if(!this.books.length) promises.push(this.fetchBooks())
    await Promise.all(promises)

    this.loading = false
    let test = this.tests.find(t => t.id == this.$route.params.id)
    if(test){
      this.book = this.books.find(b => b.id == test.book_id)
      test.pages = this.book.pages.map(page => {
        const front = page.find(item => item.name == test.front.pageKey.name)
        const back = page.find(item => item.name == test.back.pageKey.name)
        return {
          front: {
            value: front ? front.value : null,
            type: front ? front.type : null,
            image: front ? front.image : null,
          },
          back: {
            value: back ? back.value : null,
            type: back ? back.type : null,
            image: back ? back.image : null,
          },
        }
      })
      this.setCurrentTest(test)
      this.shuffle()
      this.setNavbarTitle(test.name)
    } else {
      this.$router.push({name: 'books'})
    }
  }
}
</script>


<style lang="stylus">
#test-page
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
    margin-bottom 2em
    margin-top 2em

    .face-container
      display flex
      flex-wrap wrap
      align-items center
      justify-content center
      background white
      box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)
      flex-basis 80%

      .face
        padding 2.2em .2em

      img
        width auto
        height 100px

      span
        flex-basis 100%
        font-size 2.5em
        user-select none

  .text-input-container
    margin-bottom 1em
    width 60%
    z-index 2

  .actions-container
    position absolute
    display flex
    align-items center
    justify-content center
    bottom calc(52px + 2em)
    width 100%

    .actions
      align-items center
      justify-content space-around
      display flex
      background white
      border-radius 50px
      box-shadow -1px 2px 2px 1px rgba(0, 0, 0, .05)
      padding .6em .7em

      button
        margin 0 1.5em
        &:nth-child(1)
          margin-left 0
        &:last-child
          margin-right 0

  .answer-modal
    position absolute
    top 45%
    z-index 3
    background white
    box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)
    font-size 1em
    width 80%
    padding .5em



</style>
