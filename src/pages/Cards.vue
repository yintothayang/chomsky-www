<template lang="pug">
#cards-page
  .card-list
    .card-container(v-for="card in cards" @click="toggleSelected(card)")
      .card(:class="{'selected': card.selected}")
        .face.front
          h1 {{card.front}}
        .face.back
          h1 {{card.back}}



  .create-deck-button(@click="createDeckModalOpen = !createDeckModalOpen" v-if="selectedCards.length")
    v-btn.on(fab dark large color="blue")
      v-icon(dark) style

  .create-card-button(@click="createCardModalOpen = !createCardModalOpen")
    v-btn.on(fab dark large color="green")
      v-icon(dark) add

  create-card-modal(:open="createCardModalOpen" :card="{}")
  v-snackbar(v-model="toast.open" :timeout="1000") {{toast.message}}


</template>

<script>
import CreateCardModal from '@/components/CreateCardModal.vue'
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'CardPage',
  components: {
    CreateCardModal
  },
  data() {
    return {
      createCardModalOpen: false,
      card: {},
      toast: {open: false}
    }
  },
  computed: {
    ...mapGetters({
      cards: 'cards/cards',
      selectedCards: 'cards/selectedCards',
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
        padding 2em
        margin 1em
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

  .create-card-button
    position absolute
    top 85%
    left 85%

</style>
