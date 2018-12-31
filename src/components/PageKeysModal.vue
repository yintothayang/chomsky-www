<template lang="pug">
  v-layout(row='', justify-center='')
    v-dialog(v-model='open', max-width='500px')
      v-card#create-test-modal
        v-card-title
          span.headline Page Keys

        .form
          h1 hi

        v-card-actions
          v-spacer
          v-btn(color='red' flat='' @click.native='open = ""') Done


</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'PageKeysModal',
  data() {
    return {
      loading: false,
      book: null
    }
  },
  watch: {
    options: function(newVal, oldVal){
      this.book = newVal
    }
  },
  computed: {
    ...mapGetters({
      openModal: 'modals/openModal',
      options: 'modals/options',
      tests: 'tests/tests'
    }),
    open: {
      get(){
        return this.openModal == "PageKeysModal"
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
