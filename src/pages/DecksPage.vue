<template lang="pug">
#decks-page
  .deck-list(v-if="decks.length")
    .deck(v-for="deck in decks" @click="toggleSelected(deck)")
      v-card(:class="{'selected': selectedDecks.includes(deck)}")
        v-card-title(primary-title="")
          div
            h3.headline.mb-0 {{deck.name}}
            span {{deck.card_ids.length}} total cards
        v-card-actions
          v-btn(flat="" color="orange" @click="deleteDeck(deck)") Delete

  .empty(v-else)
    span No decks found
    router-link(:to="{name: 'cards'}")
      v-btn(color="success") Create a Deck

  .actions-container
    .item.create-card-button(@click="play()" v-if="selectedDecks.length")
      v-btn.on(fab dark large color="green")
        v-icon(dark) play_arrow


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
      selectedDecks: 'decks/selectedDecks',
    }),
  },
  methods: {
    ...mapActions({

    }),
    ...mapMutations({
      setNavbarTitle: 'navbar/SET_TITLE',
      addCard: 'cards/ADD_CARD',
      deleteDeck: 'decks/DELETE_DECK',
      setSelected: 'decks/SET_SELECTED',
      toggleSelected: 'decks/TOGGLE_SELECTED',
    }),
    play(){
      this.$router.push({name: 'game'})
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
    flex-wrap wrap
    padding 2em

    .deck
      flex-basis 25%
      padding 1em

      .v-card
        &:hover
          background lighten(orange, 80%)
        &.selected
          background lighten(orange, 20%)
          color white
          .v-btn
            color white !important

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

  .actions-container
    display flex
    position absolute
    top 85%
    right 1em

</style>
