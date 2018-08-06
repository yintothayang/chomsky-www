<template lang="pug">
#game-page
  .card-container
    .card
      span {{currentCard.front}}
  .text-input-container
    text-input(:card="currentCard" @attempt="onAttempt" @success="onSuccess")
  .speech-input-container
    speech-input(:card="currentCard" @attempt="onAttempt" @success="onSuccess")

</template>

<script>
import TextInput from '@/components/TextInput'
import SpeechInput from '@/components/SpeechInput'
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'GamePage',
  components: {
    TextInput,
    SpeechInput,
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
      selectedDeckCards: 'cards/selectedDeckCards',
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
        this.cards = this.suffle(this.seenCards.concat(this.cards))
        this.seenCards = []
      }
    },
    suffle(deck){
      var currentIndex = deck.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = deck[currentIndex]
        deck[currentIndex] = deck[randomIndex]
        deck[randomIndex] = temporaryValue
      }
      return deck
    }
  },
  created(){
    if(!this.selectedDeckCards.length){
      this.$router.push({name: 'decks'})
    } else {
      this.setNavbarTitle("Game")
      this.cards = this.selectedDeckCards.slice(0)
    }
  }
}
</script>


<style lang="stylus">
#game-page
  display flex
  flex-direction column
  align-items center
  height 100%

  .card-container
    display flex
    align-items center
    justify-content center
    margin-bottom 3em
    margin-top 4em

    .card
      font-size 3.5em
      padding 1em 3em
      background white
      box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)

  .text-input-container
    margin-bottom 3em

  .speech-input-container
    position absolute
    top 85%
    left 92%

</style>
