<template lang="pug">
#game-page
  .card-container
    .card
      span {{currentCard.front}}
</template>

<script>

import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'GamePage',
  data() {
    return {
      cards: []
    }
  },
  computed: {
    ...mapGetters({
      selectedDecks: 'decks/selectedDecks',
    }),
    currentCard(){
      return this.cards[0]
    }
  },
  methods: {
    ...mapMutations({
      setNavbarTitle: 'navbar/SET_TITLE',
    }),
  },
  created(){
    this.setNavbarTitle("Game")
    this.selectedDecks.forEach(deck => {
      this.cards = this.cards.concat(deck.cards)
    })
  }
}
</script>


<style lang="stylus">
#game-page
  display flex
  align-items center
  justify-content center
  height 100%

  .card-container
    display flex
    align-items center
    justify-content center

    .card
      font-size 3.5em
      padding 1em 3em
      background white
      box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)

</style>
