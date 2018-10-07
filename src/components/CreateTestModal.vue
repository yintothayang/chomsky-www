<template lang="pug">
  v-layout(row='', justify-center='')
    v-dialog(v-model='open', max-width='500px')
      v-card#create-test-modal
        v-card-title
          span.headline Create a new Book
        .types
          router-link.type(:to="{name: 'edit-book', params: {id: 'new_basic'}}" tag="div" @click.native='open = ""')
            v-icon() view_agenda
            span Basic
          router-link.type(:to="{name: 'edit-book', params: {id: 'new_advanced'}}" tag="div" @click.native='open = ""')
            v-icon() view_list
            span Advanced

        v-card-actions
          v-spacer
          v-btn(color='red' flat='' @click.native='open = ""') Cancel


</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'CreateTestModal',
  computed: {
    ...mapGetters({
      openModal: 'modals/openModal',
    }),
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
      setOpenModal: 'modals/SET_OPEN_MODAL'
    })
  }
}
</script>


<style lang="stylus" scoped>
#create-test-modal
  .v-card__title
    padding-bottom 0px

  .container
    .v-input
      margin-top 8px

  .types
    display flex
    align-items center
    justify-content center
    margin 1em 1em

    .type
      padding 1.5em 1em
      display flex
      flex-basis 100%
      flex-wrap wrap
      border 1px solid rgba(0, 0, 0, .15)
      align-items center
      justify-content center
      margin 0em .5em

      &:hover
        background-color rgba(0, 0, 0, .1)

      i
        font-size 2.3em
        margin-bottom .3em
      span
        flex-basis 100%
        font-size 1.2em

</style>
