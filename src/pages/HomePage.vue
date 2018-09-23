<template lang="pug">
#home-page
  .card-container
    .card
      span.name Einstein

  .auth-container
    v-btn(color="white" @click="$router.push({name: 'login'})") Log In
    v-btn(color="white" @click="$router.push({name: 'signup'})") Sign Up
</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'HomePage',
  watch: {
    user: function(){
      if(this.user){
        this.$router.push({name: 'books'})
      }
    }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      user: 'users/activeUser',
    }),
  },
  methods: {

  },
  created(){
    if(this.user){
      this.$router.push({name: 'books'})
    }
  },
  mounted(){
    if(this.user){
      this.$router.push({name: 'books'})
    }
  }
}
</script>


<style lang="stylus" scoped>
#home-page
  height 100%
  // background-image: url("/images/noise.png"), -webkit-radial-gradient(top center, #f7931e, #f15a24 250px)
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
