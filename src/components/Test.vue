<template lang="pug">
.test-list-item
  .name-container
    span.name {{test.name}}

  .keys-container
    .key
      span.name Front:
      span.value {{test.front.pageKey.name}}
    .key
      span.name Back:
      span.value {{test.back.pageKey.name}}


  .actions-container
    .action.delete
      v-btn(small flat @click="$emit('delete', test)")
        v-icon(color="red lighten-1") delete
    .action.play
      v-btn(small flat @click="$emit('play', test)")
        v-icon(color="green lighten-1") play_arrow

    //- .bottom
    //-   .tags(v-if="test.tags")
    //-     span.tag(v-for="tag in test.tags.split(' ')") {{tag}}

    //- v-speed-dial(v-model='open', transition='slide-y-reverse-transition' direction="bottom" v-if="!isLibrary")
    //-   v-btn(slot='activator' v-model='open' color='blue darken-2' fab flat)
    //-     v-icon.open expand_more
    //-     v-icon.close close


    //-   router-link(:to="{name: 'edit-test', params: {id: test.id}}" tag="div")
    //-     v-btn(fab dark small color='indigo')
    //-       v-icon edit

    //-   v-btn(fab dark small color='green' @click="$emit('play', test)")
    //-     v-icon play_arrow


</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'Test',
  data(){
    return {
      open: false
    }
  },
  props: {
    test: {
      default: ()=>{}
    },
    isLibrary: {
      default: false
    },
  },
  computed: {
    ...mapGetters({

    }),
  },
  methods: {
    ...mapMutations({
      updateFilters: 'decks/UPDATE_FILTERS',
    }),
  }
}
</script>


<style lang="stylus">
.test-list-item
  display flex
  flex-wrap wrap
  height 100%
  cursor pointer
  background white
  box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)
  user-select none
  .name-container
    border-bottom 2px solid rgba(0, 0, 0, .05)
    padding .5em 1em 0 1em
    width 100%
    .name
      font-size 1.1em
      font-weight 600

  .keys-container
    display flex
    flex-wrap wrap
    padding .5em 1em
    width 100%
    border-bottom 1px solid rgba(0, 0, 0, .05)
    .key
      display flex
      flex-basis 100%

      .name
        font-weight 600
        font-size .9em
      .value
        margin-left auto

  .actions-container
    display flex
    padding 0em 0em
    width 100%

    .action
      button
        min-width 0px

    .play
      margin-left auto
</style>
