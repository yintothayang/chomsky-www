<template lang="pug">
#game-settings-form
  v-card-title
    span.headline Game Settings
  v-container(grid-list-md='')
    v-layout(wrap='')
      v-flex(xs12='', sm6='', md12='')
        v-select(v-model="mode" :items="['type', 'voice']" label="Game Mode")


</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'FilterCardsForm',
  data(){
    return {
      card: {}
    }
  },
  computed: {
    ...mapGetters({
      gameMode: 'game/mode',
    }),
    mode: {
      get(){
        return this.gameMode
      },
      set(value){
        this.setMode(value)
      }
    },
  },
  methods: {
    ...mapMutations({
      setMode: 'game/SET_MODE',
    }),
  }
}
</script>


<style lang="stylus" scoped>
#filter-cards-form
  background rgba(0, 0, 0, 0)
  .v-card__title
    padding-bottom 0px

  .container
    .v-input
      margin-top 8px
</style>
