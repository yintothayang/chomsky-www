<template lang="pug">
  v-layout(row='', justify-center='')
    v-dialog(v-model='open', max-width='500px')
      v-card#page-keys-modal
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
      keys: null
    }
  },
  watch: {
    options: function(newVal, oldVal){
      console.log("update", newVal)
      this.keys = newVal
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
#page-keys-modal
  .v-card__title
    padding-bottom 0px

  .container
    .v-input
      margin-top 8px

  .form
    padding 1em




</style>
