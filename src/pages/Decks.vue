<template lang="pug">
#decks-page
  .deck-list
    .deck(v-for="deck in decks")
      v-card
        v-card-media(src="/static/doc-images/cards/desert.jpg" height="200px")
        v-card-title(primary-title="")
          div
            h3.headline.mb-0 Kangaroo Valley Safari
            div
              | Located two hours south of Sydney in the
              br
              | Southern Highlands of New South Wales, ...
        v-card-actions
          v-btn(flat="" color="orange") Share
          v-btn(flat="" color="orange") Explore

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
    }),
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
</style>
