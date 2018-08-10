<template lang="pug">
#library-page
  .deck-list(v-if="localDecks.length")
    .deck-container(v-for="deck in localDecks" @click="toggleSelected(deck)")
      .deck(:class="{'selected': selectedDecks.includes(deck)}")
        span.name {{deck.name}}
        span.card-count {{deck.card_ids.length}} card(s)

        .deck-actions-container
          v-btn(color="orange" @click="copyDeck(deck)" flat="") Copy

  .actions-container
    .item.create-card-button(@click="play()" v-if="selectedDecks.length")
      v-btn.on(fab dark large color="green")
        v-icon(dark) play_arrow


</template>

<script>
import uuid from 'uuid/v4'
import hirigana from '@/assets/hirigana'
import katakana from '@/assets/katakana'

import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'LibraryPage',
  data() {
    return {
      localDecks: []
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
      copyDeck: 'decks/COPY_DECK',
      setSelected: 'decks/SET_SELECTED',
      toggleSelected: 'decks/TOGGLE_SELECTED',
      copyCards: 'cards/COPY_CARDS',
    }),
  },
  created(){
    this.setNavbarTitle("Library")


    this.localDecks.push({
      name: 'Hirigana',
      card_ids: hirigana.map(c => {
        if(!c.id){
          c.id = uuid()
        }
        return c.id
      }),
      _cards: hirigana
    })

    this.localDecks.push({
      name: 'Katakana',
      card_ids: katakana.map(c => {
        if(!c.id){
          c.id = uuid()
        }
        return c.id
      }),
      _cards: katakana
    })


  }
}
</script>


<style lang="stylus" scoped>
#library-page
  .deck-list
    overflow-y scroll
    display flex
    flex-wrap wrap
    padding 2em

    .deck-container
      display flex
      flex-basis 100%
      margin-bottom 1em
      justify-content center
      align-items center

      .deck
        display flex
        padding 1em 2em .5em 2em
        flex-grow 1
        cursor pointer
        transition all .1s
        background white
        box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)
        user-select none
        flex-basis 100%
        flex-wrap wrap

        &:hover
          background lighten(orange, 80%)
        &.selected
          background lighten(orange, 20%)
          color white
          .v-btn
            color white !important

        .name
          font-size 1.8em
          font-weight 600
          flex-basis 100%
          text-align left
        .card-count
          font-size 1em
          font-weight 500
          flex-basis 100%
          text-align left

        .deck-actions-container
          display flex
          justify-content flex-end
          align-items center
          flex-basis 100%

          button
            margin 0px
            padding 0px

  .empty
    padding 5em 1em
    display flex
    flex-wrap wrap
    align-items center
    justify-content center

    span
      font-weight 600
      font-size 1.8em
      flex-basis 100%
      margin-bottom 2em
      color rgba(0, 0, 0, .6)

  .actions-container
    display flex
    position absolute
    top 85%
    right 1em

</style>
