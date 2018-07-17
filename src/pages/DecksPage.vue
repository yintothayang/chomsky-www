<template lang="pug">
#decks-page
  .deck-list(v-if="decks.length")
    .deck(v-for="deck in decks")
      v-card
        v-card-media(src="/static/doc-images/cards/desert.jpg" height="200px")
        v-card-title(primary-title="")
          div
            h3.headline.mb-0 {{deck.name}}
            span {{deck.cards.length}} total cards
        v-card-actions
          v-btn(flat="" color="orange" @click="play(deck)") Play
          v-btn(flat="" color="orange" @click="deleteDeck(deck)") Delete

  .empty(v-else)
    span No decks found
    router-link(:to="{name: 'cards'}")
      v-btn(color="success") Create a Deck


</template>

<script>

import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'DeckPage',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      decks: 'decks/decks',
    }),
  },
  methods: {
    ...mapActions({

    }),
    ...mapMutations({
      setNavbarTitle: 'navbar/SET_TITLE',
      addCard: 'cards/ADD_CARD',
      deleteDeck: 'decks/DELETE_DECK',
    }),
    play(deck){

    }
  },
  created(){
    this.setNavbarTitle("Decks")
  }
}
</script>


<style lang="stylus" scoped>
#decks-page
  .deck-list
    overflow-y scroll
    display flex
    padding 2em

    .deck
      padding 1em

  .empty
    padding 5em 1em
    display flex
    flex-wrap wrap
    align-items center
    justify-content center
    span
      font-weight 500
      font-size 1.8em
      flex-basis 100%
      margin-bottom 1em
</style>
