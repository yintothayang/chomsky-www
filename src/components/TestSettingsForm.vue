<template lang="pug">
#test-settings-form
  v-card-title
    span.headline Test Settings
  v-container(grid-list-md='')
    v-layout(wrap='')
      v-flex(xs12='', sm6='', md12='')
        v-select(v-model="mode" :items="['text', 'speech']" label="Test Mode")
      v-flex(xs12='', sm6='', md12='' v-if="mode == 'speech'")
        v-select(v-model="lang" :items="langOptions" label="Speech Language")
      v-flex(xs12='', sm6='', md12='' v-if="mode == 'speech'")
        v-select(v-model="dialect" :items="dialectOptions" label="Speech Dialect")


</template>

<script>
import langs from '@/assets/langs'
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'TestSettingsForm',
  data(){
    return {
      card: {}
    }
  },
  computed: {
    ...mapGetters({
      test: 'tests/currentTest',
      testMode: 'tests/mode',
      testLang: 'tests/lang',
      testDialect: 'tests/dialect',
    }),
    mode: {
      get(){
        return this.testMode
      },
      set(value){
        this.updateTest(Object.assign(this.test, {mode: value}))
      }
    },
    lang: {
      get(){
        return this.testLang
      },
      set(value){
        this.updateTest(Object.assign(this.test, {lang: value}))
        this.dialect = langs.find(l => l[0] === value)[1][0]
      }
    },
    dialect: {
      get(){
        return this.testDialect
      },
      set(value){
        this.updateTest(Object.assign(this.test, {dialect: value}))
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
    ...mapActions({
      updateTest: 'tests/updateTest',
    }),
  },
  created(){

  }
}
</script>


<style lang="stylus" scoped>
#test-settings-form
  background rgba(0, 0, 0, 0)
  .v-card__title
    padding-bottom 0px

  .container
    .v-input
      margin-top 8px
</style>
