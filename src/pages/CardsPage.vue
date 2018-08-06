<template lang="pug">
#cards-page
  .card-list(v-if="cards.length")
    .card-container(v-for="card in filteredCards" @click="toggleSelected(card)" :style="'flex-basis: ' + cardFlexBasis")
      .card(:class="{'selected': selectedCards.includes(card)}")
        .face.front
          h1 {{card.front}}
        .face.back
          h1 {{card.back}}

  .empty(v-else)
    span No Cards found
    v-btn(color="info" @click="setOpenModal('CreateCardModal')" large) Create a Card

  .actions-container
    v-tooltip(left)
      v-btn.on(fab dark color="green" @click="setOpenModal('CreateCardModal')" slot="activator")
        v-icon(dark) add
      span Create a Card
    v-tooltip(left)
      v-btn.on(fab dark color="purple" @click="$refs.cardUpload.click()" slot="activator")
        v-icon(dark) cloud_upload
      span Import Cards
    v-tooltip(left v-if="selectedCards.length")
      v-btn.on(fab dark color="blue" @click="setOpenModal('CreateDeckModal')" slot="activator")
        v-icon(dark) style
      span Create a Deck

  input#card-upload(type="file" @change="onCardsUploaded()" ref="cardUpload" multiple)
</template>

<script>
import DragSelect from 'dragselect'
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'CardPage',
  data() {
    return {
      card: {},
    }
  },
  watch: {
    cards: function(){
      this.$nextTick(()=>{
        new DragSelect({
          selectables: document.getElementsByClassName('card'),
          callback: this.onDragSelect,
        })
      })
    }
  },
  computed: {
    ...mapGetters({
      cards: 'cards/cards',
      cardFilters: 'cards/filters',
      selectedCards: 'cards/selectedCards',
      filteredCards: 'cards/filteredCards',
    }),
    cardFlexBasis(){
      if(this.cardFilters.cardsPerRow === 'auto'){return "auto"}
      if(this.cardFilters.cardsPerRow === 'max'){return "1%"}
      if(this.cardFilters.cardsPerRow === 1){return "100%"}
      if(this.cardFilters.cardsPerRow === 2){return "50%"}
      if(this.cardFilters.cardsPerRow === 3){return "33.3%"}
      if(this.cardFilters.cardsPerRow === 4){return "25%"}
      if(this.cardFilters.cardsPerRow === 5){return "20%"}
      if(this.cardFilters.cardsPerRow === 10){return "10%"}
    }
  },
  methods: {
    ...mapMutations({
      setNavbarTitle: 'navbar/SET_TITLE',
      updateCard: 'cards/UPDATE_CARD',
      addCard: 'cards/ADD_CARD',
      toggleSelected: 'cards/TOGGLE_SELECTED',
      setOpenModal: 'modals/SET_OPEN_MODAL',
    }),
    onCardsUploaded(){
      let files = this.$refs.cardUpload.files
      let fr = new FileReader()
      fr.onload = async(e) => {
        var cards = JSON.parse(e.target.result)
        cards.forEach(card => {
          this.addCard(card)
        })
      }
      for(let i=0; i<files.length; i++){
        fr.readAsText(files.item(i))
      }
    },
    onDragSelect(e){
      if(e.length > 1){
        e.forEach(e=>{
          e.click()
        })
      }
    }
  },
  created(){
    this.setNavbarTitle("Cards")
  },
  mounted(){
    new DragSelect({
      selectables: document.getElementsByClassName('card'),
      callback: this.onDragSelect,
    })
  }
}
</script>


<style lang="stylus" scoped>
#cards-page
  .card-list
    max-height 100%
    overflow-y scroll
    display flex
    flex-wrap wrap
    justify-content flex-start
    padding 2em
    padding-bottom 5em

    .card-container
      .card
        padding 2em .5em
        margin .5em
        flex-grow 1
        cursor pointer
        transition all .1s
        background white
        box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)
        user-select none

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
    position absolute
    bottom 10px
    display flex
    align-items center
    justify-content space-around
    width 100%

    .v-tooltip
      display block

  #card-upload
    display none
    height 0px
    width 0px

</style>
