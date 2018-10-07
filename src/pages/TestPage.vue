<template lang="pug">
#test-page
  span active
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
      loading: false,
      showAnswer: false,
    }
  },
  computed: {
    ...mapGetters({
      lang: 'tests/lang',
      dialect: 'tests/dialect',
      mode: 'tests/mode',
      test: 'tests/test',
      active: 'tests/active',
      currentPage: 'tests/currentPage',
    }),
  },
  methods: {
    ...mapMutations({
      setNavbarTitle: 'navbar/SET_TITLE',
      previousPage: 'tests/PREVIOUS_PAGE',
      nextPage: 'tests/NEXT_PAGE',
      randomize: 'tests/RANDOMIZE_PAGES',
      resetPages: 'tests/RESET_PAGES',
    }),
    ...mapActions({
      initTest: 'tests/initTest',
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
  },
  async created(){
    !this.test ? this.$router.push({name: 'books'}) : void(0)
    this.setNavbarTitle(this.test.name)
    await this.initTest()
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
