<template lang="pug">
#game-page
  .card-container
    .card
      span {{currentCard.front}}
  .text-input-container
    text-input(:card="currentCard" @attempt="onAttempt" @success="onSuccess")
</template>

<script>
import TextInput from '@/components/TextInput'
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'GamePage',
  components: {
    TextInput,
  },
  data() {
    return {
      cards: [],
      seenCards: [],
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
    onAttempt(answer){
      console.log("attempt", answer)
    },
    onSuccess(){
      if(this.cards.length > 1){
        this.seenCards.push(this.cards.shift())
      } else {
        console.log('suffle')
        console.log(this.deck)
        console.log(this.seenCards)
        // this.deck = this.suffle(this.seenCards.concat(this.deck))
      }
    },
    suffle(deck){
      var currentIndex = deck.length, temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = deck[currentIndex]
        deck[currentIndex] = deck[randomIndex]
        deck[randomIndex] = temporaryValue
      }
      return deck
    }
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
  flex-direction column
  align-items center
  justify-content center
  height 100%

  .card-container
    display flex
    align-items center
    justify-content center
    margin-bottom 3em

    .card
      font-size 3.5em
      padding 1em 3em
      background white
      box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)

  .text-input-container
    margin-bottom 3em

</style>
