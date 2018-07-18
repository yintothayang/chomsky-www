<template lang="pug">
#create-deck-modal
  v-layout(row='', justify-center='')
    v-dialog(v-model='local_open', max-width='500px')
      v-card
        v-card-title
          span.headline New Deck
        v-card-text
          v-container(grid-list-md='')
            v-layout(wrap='')
              v-flex(xs12='', sm6='', md12='')
                v-text-field(label='Name*', required='' v-model="deck.name")
            span {{cards.length}} card(s) selected
              //- v-flex(xs12='')
              //-   v-text-field(label='Back*', required='' v-model="card.back")
          small *indicates required field
        v-card-actions
          v-spacer
          v-btn(color='blue darken-1', flat='', @click.native='local_open = false') Close
          v-btn(color='blue darken-1', flat='', @click.native='createDeck(); local_open = false') Create

</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'CreateDeckModal',
  props: {
    open: {
      default: false
    },
    cards: {
      default: ()=>[]
    },
  },
  watch: {
    open: function(new_value){
      this.local_open = true
    },
  },
  data() {
    return {
      local_open: false,
      deck: {},
    }
  },
  computed: {

  },
  methods: {
    ...mapMutations({
      addDeck: 'decks/ADD_DECK',
      setSelected: 'cards/SET_SELECTED',
    }),
    createDeck(){
      this.deck.cards = this.cards
      this.addDeck(this.deck)
      this.deck = {}
      this.setSelected([])
      this.$router.push({name: 'decks'})
    }
  }
}
</script>


<style lang="stylus" scoped>
#create-card-modal
  margin 0px
</style>
