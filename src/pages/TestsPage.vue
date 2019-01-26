<template lang="pug">
#tests-page
  .test-list(v-if="tests.length && !loading")
    .test-container(v-for="test in tests")
      test(:test="test" @delete="deleteTest" @play="play")

  .empty(v-if="!tests.length && !loading")
    span.none No Tests Found

  //- .actions-container
  //-   .actions
  //-     .item.add-test
  //-       v-btn.on(small fab dark color="blue lighten-1" slot="activator" @click="setOpenModal('NewTestModal')")
  //-         v-icon(dark) add


  v-progress-circular.loading(:size="120" :width="10" color="blue" indeterminate v-if="loading")
</template>

<script>

import {mapActions, mapMutations, mapGetters} from 'vuex'
import Test from '@/components/Test'

export default {
  name: 'TestsPage',
  components: {
    Test,
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      activeUser: 'users/activeUser',
      tests: 'tests/usersTests',
      tests: 'tests/tests',
    }),
  },
  methods: {
    ...mapActions({
      fetchTests: 'tests/fetchTests',
      deleteTest: 'tests/deleteTest',
    }),
    ...mapMutations({
      setNavbarTitle: 'navbar/SET_TITLE',
      setOpenModal: 'modals/SET_OPEN_MODAL',
      setModalOptions: 'modals/SET_OPTIONS',
    }),
    play(test){
      this.$router.push({name: 'test', params: {id: test.id}})
    }
  },
  async created(){
    this.setNavbarTitle("Tests")
    this.loading = true
    !this.tests.length ? await this.fetchTests() : void(0)
    this.loading = false

    // TODO start a Report
  }
}
</script>


<style lang="stylus" scoped>
#tests-page
  height 100%
  display inline-table
  width 100%
  .test-list
    overflow-y auto
    padding 1em .5em
    height calc(100% - 52px - 2em)
    text-align left
    .test-container
      display inline-block
      padding .0em .5em 1em .5em
      width 50%

  .empty
    padding 5em 1em
    display flex
    flex-wrap wrap
    align-items center
    justify-content center

    span.none
      font-weight 600
      font-size 1.8em
      flex-basis 100%
      margin-bottom 2em
      color rgba(0, 0, 0, .6)
    span.or
      flex-basis 100%
      font-weight 600
      font-size 1.2em

  .empty
    padding 5em 1em
    display flex
    flex-wrap wrap
    align-items center
    justify-content center

    span.none
      font-weight 600
      font-size 1.8em
      flex-basis 100%
      margin-bottom 2em
      color rgba(0, 0, 0, .6)
    span.or
      flex-basis 100%
      font-weight 600
      font-size 1.2em

  .actions-container
    display flex
    align-items center
    justify-content center
    bottom 10px
    width 100%
    position absolute

    .actions
      display flex
      background white
      border-radius 50px
      box-shadow -1px 2px 2px 1px rgba(0, 0, 0, .05)

    .item
      margin 0em .3em

  .loading
    margin-top 8em
</style>
