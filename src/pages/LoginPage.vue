<template lang="pug">
#login-page
  .card-container
    .card
      v-form(ref="form")
        v-text-field(v-model="email" label="Email" type="email")
        v-text-field(v-model="password" label="Password" type="password")
        v-btn(:disabled="!valid" @click="submit") submit

  .router-link(:disabled="!valid" :to="{name: 'signup'}")
    v-btn(@click="$router.push({name: 'signup'})") sign up

</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'LoginPage',
  data() {
    return {
      email: "",
      password: ""
    }
  },
  computed: {
    ...mapGetters({
      activeUser: 'users/activeUser',
    }),
    valid(){
      if(this.email.length && this.password.length){
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
      login: 'users/login'
    }),
    submit(){
      let data = {
        email: this.email,
        password: this.password
      }
      this.login(data).then(()=>{
        this.$router.push({name: 'cards'})
      }).catch(e => {
        // TODO ->
        console.error("TODO!, need error feedback")
      })
    }
  },
  created(){
    if(this.activeUser){
      this.$router.push({name: 'books'})
    } else {
      this.setNavbarTitle("Login")
    }
  },
  mounted(){

  }
}
</script>


<style lang="stylus" scoped>
#login-page
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
