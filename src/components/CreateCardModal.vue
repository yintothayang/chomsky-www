<template lang="pug">
#create-card-modal
  v-layout(row='', justify-center='')
    v-dialog(v-model='open', max-width='500px')
      v-card
        v-card-title
          span.headline New Card
        v-card-text
          v-container(grid-list-md='')
            v-layout(wrap='')
              v-flex(xs12='', sm6='', md12='')
                v-text-field(label='Front*', required='' v-model="card.front")
              v-flex(xs12='')
                v-text-field(label='Back*', required='' v-model="card.back")
          small *indicates required field
        v-card-actions
          v-spacer
          v-btn(color='blue darken-1', flat='', @click.native='open = false') Close
          v-btn(color='blue darken-1', flat='', @click.native='createCard(); open = false') Create

</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'CreateCardModal',
  props: {
    open: {
      default: false
    },
    card: {
      default: ()=>{}
    }
  },
  data() {
    return {}
  },
  computed: {

  },
  methods: {

  }
}
</script>


<style lang="stylus" scoped>
#create-card-modal
  margin 0px
</style>
