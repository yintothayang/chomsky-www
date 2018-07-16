<template lang="pug">
#cards-page
  .card-list(v-if="cards.length")
    .card-container(v-for="card in filteredCards" @click="toggleSelected(card)")
      .card(:class="{'selected': card.selected}")
        .face.front
          h1 {{card.front}}
        .face.back
          h1 {{card.back}}

  .empty(v-else)
    span No cards found
      v-btn(color="success" @click="createCardModalOpen = !createCardModalOpen") Create a Card


  .actions-container
    .create-deck-button(@click="createDeckModalOpen = !createDeckModalOpen" v-if="selectedCards.length")
      v-btn.on(fab dark large color="blue")
        v-icon(dark) style
    .create-card-button(@click="createCardModalOpen = !createCardModalOpen")
      v-btn.on(fab dark large color="green")
        v-icon(dark) add



  create-card-modal(:open="createCardModalOpen" :card="{}")
  create-deck-modal(:open="createDeckModalOpen" :cards="selectedCards")
  v-snackbar(v-model="toast.open" :timeout="1000") {{toast.message}}


</template>

<script>
import CreateCardModal from '@/components/CreateCardModal.vue'
import CreateDeckModal from '@/components/CreateDeckModal.vue'
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'CardPage',
  components: {
    CreateCardModal,
    CreateDeckModal,
  },
  data() {
    return {
      createCardModalOpen: false,
      createDeckModalOpen: false,
      card: {},
      toast: {open: false}
    }
  },
  computed: {
    ...mapGetters({
      cards: 'cards/cards',
      selectedCards: 'cards/selectedCards',
      filteredCards: 'cards/filteredCards',
    }),
  },
  methods: {
    ...mapMutations({
      setNavbarTitle: 'navbar/SET_TITLE',
      updateCard: 'cards/UPDATE_CARD',
    }),
    toggleSelected(card){
      let updates = {'selected': !card.selected}
      this.updateCard({card, updates})
    },
  },
  created(){
    this.setNavbarTitle("Cards")
  }
}
</script>


<style lang="stylus" scoped>
#cards-page
  .card-list
    overflow-y scroll
    display flex
    flex-wrap wrap
    justify-content space-around
    padding 2em

    .card-container
      flex-basis 25%

      .card
        padding 2em .5em
        margin .5em
        flex-grow 1
        cursor pointer
        transition all .1s
        background white
        box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)

        &:hover
          background lighten(orange, 80%)
        &.selected
          background lighten(orange, 20%)

        .face
          display flex
          justify-content center
          align-items center

        .front
          display flex

        .back
          display none

  .actions-container
    display flex
    position absolute
    top 85%
    right 1em

  //- .create-deck-button
  //-   position absolute
  //-   top 85%
  //-   left 85%

</style>
