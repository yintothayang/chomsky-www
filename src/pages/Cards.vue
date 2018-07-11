<template lang="pug">
#cards-page
  .card-list
    .card(v-for="card in cards")
      h1 card

  .create-card-button(@click="open = true")
    v-btn.on(fab dark large color="green")
      v-icon(dark) add


  create-card-modal(:open="open" :card="{}")

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
      open: false,
      card: {}
    }
  },
  computed: {
    ...mapGetters({
      cards: 'cards/cards',
    }),
  },
  methods: {
    ...mapActions({

    }),
    ...mapMutations({
      setNavbarTitle: 'navbar/SET_TITLE',
      addCard: 'cards/ADD_CARD',
    }),
    createCard(){
      this.addCard(this.card)
      this.card = {}
    }
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
    justify-content space-between
    padding 2em

    .card
      padding 2em
      margin 1em
      flex-grow 1
      cursor pointer
      transition all .1s

      &:hover, &.active
        background-color lighten(orange, 25%)

  .create-card-button
    position absolute
    top 85%
    left 85%

</style>
