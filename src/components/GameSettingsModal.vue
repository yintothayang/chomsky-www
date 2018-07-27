<template lang="pug">
#game-settings--modal
  v-layout(row='', justify-center='')
    v-dialog(v-model='open', max-width='500px')
      v-card
        v-card-title
          span.headline New Deck
        v-card-text
          v-container(grid-list-md='')
            v-layout(wrap='')
              v-flex(xs12='', sm6='', md12='')
                v-text-field(label='Name*', required='' v-model="deck.name")
            span {{selectedCards.length}} card(s) selected
              //- v-flex(xs12='')
              //-   v-text-field(label='Back*', required='' v-model="card.back")
          small *indicates required field
        v-card-actions
          v-spacer
          v-btn(color='blue darken-1', flat='', @click.native='open = ""') Close
          v-btn(color='blue darken-1', flat='', @click.native='createDeck()') Create


</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'GameSettingsModal',
  data() {
    return {
      deck: {},
    }
  },
  computed: {
    ...mapGetters({
      openModal: 'modals/openModal',
      options: 'modals/options',
      selectedCards: 'cards/selectedCards',
    }),
    open: {
      get(){
        return this.openModal == "GameSettingsModal"
      },
      set(value){
        this.setOpenModal()
      }
    }
  },
  methods: {
    ...mapMutations({
      addDeck: 'decks/ADD_DECK',
      setSelected: 'cards/SET_SELECTED',
      setOpenModal: 'modals/SET_OPEN_MODAL',
    }),
  }
}
</script>


<style lang="stylus" scoped>
#game-settings-modal
  margin 0px
</style>
