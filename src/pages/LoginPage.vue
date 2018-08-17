<template lang="pug">
#signup-page
  .card-container
    .card


</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'SignupPage',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      user: 'user/activeUser',
    }),
  },
  methods: {
    ...mapMutations({
      updateUser: 'cards/UPDATE_ACTIVE_USER',
    }),
  },
  created(){
    if(this.user){
      this.$router.push({name: 'decks'})
    }
  },
  mounted(){

  }
}
</script>


<style lang="stylus" scoped>
#signup-page
  height 100%
  background-image: url("/images/noise.png"), -webkit-radial-gradient(top center, #f7931e, #f15a24 250px)
  display flex
  flex-wrap wrap
  justify-content center

  .card-container
    margin-top 6em
    .card
      padding 3em 4em
      transition all .1s
      background white
      box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .2)
      border-radius 2px
      user-select none

    .name
      font-size 3.5em
      font-family 'Cinzel', serif

  .auth-container
    margin-top 4em
    flex-basis 100%

    button
      font-weight 400
      margin-right 2em
      margin-left 2em
</style>
