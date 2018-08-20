<template lang="pug">
#signup-page
  .card-container
    .card
      v-form(ref="form")
        span Sign Up
        v-text-field(v-model="email" label="Email" type="email")
        v-text-field(v-model="password" label="Password" type="password")
        v-btn(:disabled="!valid" @click="submit") submit

  .router-link(:disabled="!valid" :to="{name: 'login'}")
    v-btn(@click="$router.push({name: 'login'})") login
</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'

export default {
  name: 'SignupPage',
  data() {
    return {
      email: "",
      password: ""
    }
  },
  computed: {
    ...mapGetters({
      user: 'users/activeUser',
    }),
    valid(){
      if(this.email.length && this.password.length > 5){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapMutations({
      setNavbarTitle: 'navbar/SET_TITLE',
    }),
    ...mapActions({
      signup: 'users/signup',
    }),
    submit(){
      let data = {
        email: this.email,
        password: this.password
      }
      this.signup(data).then(results => {
        this.$router.push({name: 'decks'})
      }).catch(e => {

      })
    }
  },
  created(){
    if(this.user){
      this.$router.push({name: 'decks'})
    } else {
      this.setNavbarTitle("Sign up")
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
      padding 1em 3em
      transition all .1s
      background white
      box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .2)
      border-radius 2px
      user-select none

    span
      font-size 1.5em

  .router-link
    flex-basis 100%

</style>
