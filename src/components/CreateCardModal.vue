<template lang="pug">
#create-card-modal
  v-layout(row='', justify-center='')
    v-dialog(v-model='open', max-width='500px')
      v-card
        v-card-title
          span.headline New Card
        v-card-text
          v-container(grid-list-md='')
            v-layout(wrap='')
              v-flex(xs12='', sm6='', md12='')
                v-text-field(label='Front*', required='' v-model="card.front")
              v-flex(xs12='')
                v-text-field(label='Back*', required='' v-model="card.back")
          small *indicates required field
        v-card-actions
          v-spacer
          v-btn(color='blue darken-1', flat='', @click.native='open = ""') Close
          v-btn(color='blue darken-1', flat='', @click.native='createCard()') Create

</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'CreateCardModal',
  data(){
    return {
      card: {}
    }
  },
  computed: {
    ...mapGetters({
      openModal: 'modals/openModal',
      options: 'modals/options'
    }),
    open: {
      get(){
        return this.openModal == "CreateCardModal"
      },
      set(value){
        this.setOpenModal()
      }
    }
  },
  methods: {
    ...mapMutations({
      addCard: 'cards/ADD_CARD',
      setOpenModal: 'modals/SET_OPEN_MODAL',
    }),
    createCard(){
      this.addCard(this.card)
      this.setOpenModal("")
    }
  }
}
</script>


<style lang="stylus" scoped>
#create-card-modal
  margin 0px
</style>
