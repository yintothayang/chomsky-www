<template lang="pug">
  v-layout(row='', justify-center='')
    v-dialog(v-model='open', max-width='500px')
      v-card#create-test-modal
        v-card-title
          span.headline Create a new Test

        .form
          .face.front
            span.name Front
            .question-container
              v-select.question(:items="questionKeys" label="Question" v-model="test.front.pageKey" item-text="name" return-object)
            .image-container
              v-select.image(:items="questionKeys" label="Image" v-model="test.front.image" item-text="name" return-object)
          .face.back
            span.name Back
            .answer-container
              v-select.answer(:items="answerKeys" label="Answer" v-model="test.back.pageKey" item-text="name" return-object)

        v-card-actions
          v-spacer
          v-btn(color='red' flat='' @click.native='open = ""') Cancel
          v-btn(color='blue' flat='' :disabled="!valid" @click='onPlay()') Play


</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'CreateTestModal',
  data() {
    return {
      loading: false,
      test: {
        front: {
          pageKey: {}
        },
        back: {
          pageKey: {}
        }
      },
      book: null
    }
  },
  watch: {
    options: function(newVal, oldVal){
      if(newVal.name){
        this.book = newVal
      }
    }
  },
  computed: {
    ...mapGetters({
      openModal: 'modals/openModal',
      options: 'modals/options',
      tests: 'tests/tests'
    }),
    valid(){
      return this.test.front.pageKey ? true : false
    },
    questionKeys(){
      return this.book ? this.book.pageKeys : []
    },
    answerKeys(){
      return this.book ? this.book.pageKeys : []
    },
    open: {
      get(){
        return this.openModal == "CreateTestModal"
      },
      set(value){
        this.setOpenModal()
      }
    }
  },
  methods: {
    ...mapMutations({
      setOpenModal: 'modals/SET_OPEN_MODAL',
    }),
    ...mapActions({
      createTest: 'tests/createTest',
    }),
    async onPlay(){
      let existingTest = this.tests.find(t => (t.answerKey === this.test.answerKey && t.questionKey === this.test.questionKey && this.book.id === t.book_id))
      if(existingTest) {
        this.open = ""
        this.$router.push({name: 'test', params: {id: existingTest.id}})
      } else {
        let test = await this.createTest({
          name: this.book.name,
          book_id: this.book.id,
          mode: 'text',
          lang: '日本語',
          dialect: 'ja-JP',
          front: this.test.front,
          back: this.test.back,
        })
        this.open = ""
        this.$router.push({name: 'test', params: {id: test.id}})
      }
    }
  },
}
</script>


<style lang="stylus" scoped>
#create-test-modal
  .v-card__title
    padding-bottom 0px

  .container
    .v-input
      margin-top 8px

  .form
    padding 1em

    .face
      border 1px solid rgba(0, 0, 0, .1)
      padding .4em
      text-align left
      margin-bottom .6em
      .name
        font-size 1em
        font-weight 500



</style>
