<template lang="pug">
#login-page
  .center(v-if="!loading")
    .card-container
      .card
        v-form(ref="form")
          v-text-field(v-model="email" label="Email" type="email")
          v-text-field(v-model="password" label="Password" type="password")
          transition(mode="out-in" name="fade" v-if="error")
            span.error(v-if="error") Invalid Email or Password
          v-btn.submit(:disabled="!valid" @click="submit()") submit

    span.or or

    .router-link(:disabled="!valid" :to="{name: 'signup'}")
      v-btn(@click="$router.push({name: 'signup'})" large color="blue" dark) sign up

  transition(mode="out-in" name="fade" v-if="loading")
    .load-container(v-if="loading")
      v-progress-circular.loading(:size="120" :width="10" color="blue" indeterminate)

</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'LoginPage',
  data() {
    return {
      email: "",
      password: "",
      error: null,
      loading: false
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
  watch: {
    email: function(){
      this.error = null
    },
    password: function(){
      this.error = null
    }
  },
  methods: {
    ...mapMutations({
      setNavbarTitle: 'navbar/SET_TITLE',
    }),
    ...mapActions({
      login: 'users/login'
    }),
    async submit(){
      this.loading = true
      this.error = null
      let data = {
        email: this.email,
        password: this.password
      }
      await this.login(data).then(result => {
        this.$router.push({name: 'books'})
      }).catch(e => {
        this.error = e
        this.loading = false
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
}
</script>


<style lang="stylus" scoped>
#login-page

  .center
    display flex
    flex-wrap wrap
    justify-content center

  .card-container
    margin-top 3em
    margin-bottom 2em
    width 80%

    .card
      padding 1em 2em
      transition all .1s
      background white
      box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .2)
      border-radius 2px
      user-select none

      form
        display flex
        flex-wrap wrap
        align-items center
        justify-content center

        .v-input
          flex-basis 100%

      .error
        width 100%
        color white
        font-weight 600
        padding .5em

      button
        margin-top 1em
        margin-bottom 1em
        flex-basis 80%

  .or
    flex-basis 100%
    font-size 1.5em
    font-weight 500
    margin-bottom 1em
  .router-link
    flex-basis 100%

</style>
