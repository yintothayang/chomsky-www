<template lang="pug">
  v-layout(row='', justify-center='')
    v-dialog(v-model='open', max-width='500px')
      v-card#filter-cards-modal
        v-card-title
          span.headline Filter Cards
        v-container(grid-list-md='')
          v-layout(wrap='')
            v-flex(xs12='', sm6='', md12='')
              v-text-field(label='Search' v-model="search")
            v-flex(xs12='', sm6='', md12='')
              v-select(v-model="cardsPerRow" :items="['auto', 1, 2, 3, 4, 5, 'max']" label="Cards per row")
          label="Standard"
        v-card-actions
          v-spacer
          v-btn(color='red' flat='' @click.native='open = ""') Close

</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'FilterCardsModal',
  data(){
    return {
      card: {}
    }
  },
  computed: {
    ...mapGetters({
      openModal: 'modals/openModal',
      options: 'modals/options',
      filters: 'cards/filters',
    }),
    open: {
      get(){
        return this.openModal == "FilterCardsModal"
      },
      set(value){
        this.setOpenModal()
      }
    },
    search: {
      get(){
        return this.filters.search
      },
      set(value){
        this.updateFilters({search: value})
      }
    },
    cardsPerRow: {
      get(){
        return this.filters.cardsPerRow
      },
      set(value){
        this.updateFilters({cardsPerRow: value})
      }
    },
  },
  methods: {
    ...mapMutations({
      setOpenModal: 'modals/SET_OPEN_MODAL',
      updateFilters: 'cards/UPDATE_FILTERS',
    }),
    createCard(){
      let new_card = Object.assign({}, this.card)
      this.addCard(new_card)
      this.card = {}
      this.setOpenModal("")
    }
  }
}
</script>


<style lang="stylus" scoped>
#filter-cards-modal
  .v-card__title
    padding-bottom 0px

  .container
    .v-input
      margin-top 8px
</style>
