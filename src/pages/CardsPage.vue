<template lang="pug">
#cards-page
  .card-list(v-if="cards.length")
    .card-container(v-for="card in filteredCards" @click="toggleSelected(card)")
      .card(:class="{'selected': selectedCards.includes(card)}")
        .face.front
          h1 {{card.front}}
        .face.back
          h1 {{card.back}}

  .empty(v-else)
    span No cards found
    v-btn(color="success" @click="setOpenModal('CreateCardModal')") Create a Card

  .actions-container
    .create-card-button(@click="setOpenModal('CreateCardModal')")
      v-btn.on(fab dark large color="green")
        v-icon(dark) add
    .create-deck-button(@click="setOpenModal('CreateDeckModal')" v-if="selectedCards.length")
      v-btn.on(fab dark large color="blue")
        v-icon(dark) style
    .import-cards-button(@click="$refs.cardUpload.click()")
      v-btn.on(fab dark large color="purple")
        v-icon(dark) cloud_upload

  v-snackbar(v-model="toast.open" :timeout="1000") {{toast.message}}
  input#card-upload(type="file" @change="onCardsUploaded()" ref="cardUpload" multiple)
</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'CardPage',
  data() {
    return {
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
    height 100%
    overflow-y scroll
    display flex
    flex-wrap wrap
    justify-content flex-start
    padding 2em


    .card-container
      flex-basis 10%

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

  #card-upload
    height 0px
    width 0px

  //- .create-deck-button
  //-   position absolute
  //-   top 85%
  //-   left 85%

</style>
