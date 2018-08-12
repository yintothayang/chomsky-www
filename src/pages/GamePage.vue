<template lang="pug">
#game-page
  .card-container
    .card
      span {{currentCard.front}}
  .text-input-container(v-if="mode === 'type'")
    text-input(:card="currentCard" @attempt="onAttempt" @success="onSuccess")
  .speech-input-container(v-if="mode === 'voice'")
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

    }
  },
  computed: {
    ...mapGetters({
      mode: 'game/mode',
      cards: 'game/cards',
      selectedDeckCards: 'cards/selectedDeckCards',
    }),
    currentCard(){
      return this.cards[0]
    }
  },
  methods: {
    ...mapMutations({
      setNavbarTitle: 'navbar/SET_TITLE',
      setGameCards: 'game/SET_CARDS',
      shuffle: 'game/SHUFFLE_CARDS',
      nextCard: 'game/NEXT_CARD',
      resetCards: 'game/RESET_CARDS',
    }),
    onAttempt(answer){
      console.log("attempt", answer)
    },
    onSuccess(){
      if(this.cards.length > 1){
        this.nextCard()
      } else {
        this.nextCard()
        this.resetCards()
        this.shuffle()
      }
    },
  },
  created(){
    if(!this.selectedDeckCards.length){
      this.$router.push({name: 'decks'})
    } else {
      this.setNavbarTitle("Game")
      this.setGameCards(JSON.parse(JSON.stringify(this.selectedDeckCards)))
      this.shuffle()
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
    margin-bottom 4em
    margin-top 4em

    .card
      font-size 3.5em
      padding .4em 2.8em
      background white
      box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)

  .text-input-container
    margin-bottom 1em


</style>
