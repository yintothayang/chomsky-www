<template lang="pug">
#game-settings-form
  v-card-title
    span.headline Game Settings
  v-container(grid-list-md='')
    v-layout(wrap='')
      v-flex(xs12='', sm6='', md12='')
        v-select(v-model="mode" :items="['type', 'speech']" label="Game Mode")
      v-flex(xs12='', sm6='', md12='' v-if="mode == 'speech'")
        v-select(v-model="lang" :items="langOptions" label="Speech Language")
      v-flex(xs12='', sm6='', md12='' v-if="mode == 'speech'")
        v-select(v-model="dialect" :items="dialectOptions" label="Speech Dialect")


</template>

<script>
import langs from '@/assets/langs'
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
      gameLang: 'game/lang',
      gameDialect: 'game/dialect',
    }),
    mode: {
      get(){
        return this.gameMode
      },
      set(value){
        this.setMode(value)
      }
    },
    lang: {
      get(){
        return this.gameLang
      },
      set(value){
        this.setLang(value)
        this.dialect = langs.find(l => l[0] === value)[1][0]
      }
    },
    dialect: {
      get(){
        return this.gameDialect
      },
      set(value){
        this.setDialect(value)
      }
    },
    langOptions(){
      return langs.map(l => l[0])
    },
    dialectOptions(){
      let tmpLangs = JSON.parse(JSON.stringify(langs.find(l => l[0] === this.lang)))
      tmpLangs.shift()
      return tmpLangs.map(l => l[0])
    }
  },
  methods: {
    ...mapMutations({
      setMode: 'game/SET_MODE',
      setLang: 'game/SET_LANG',
      setDialect: 'game/SET_DIALECT',
    }),
  },
  created(){

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
