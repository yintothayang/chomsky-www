<template lang="pug">
#id
  v-app
    left-nav
    transition(mode="out-in" name="fade")
      navbar(v-if="$route.name != 'home'")
    transition(mode="out-in" name="fade")
      router-view.page-container
    //- transition(mode="out-in" name="fade" v-if="loading")
    //-   .load-container(v-if="loading")
    //-     v-progress-circular.loading(:size="120" :width="10" color="blue" indeterminate)
    right-nav

    new-book-modal
    create-test-modal
    v-snackbar(v-model="toast.open" :right="true" :top="true" :timeout="1200" :color="toast.color") {{toast.message}}

</template>

<script>
import LeftNav from '@/components/LeftNav'
import RightNav from '@/components/RightNav'
import Navbar from '@/components/Navbar'
import NewBookModal from '@/components/NewBookModal.vue'
import CreateTestModal from '@/components/CreateTestModal.vue'

import API from '@/api'
import {mapActions, mapMutations, mapGetters} from 'vuex'

export default {
  name: 'app',
  components: {
    LeftNav,
    RightNav,
    Navbar,
    NewBookModal,
    CreateTestModal,
  },
  data(){
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      toast: 'toast/toast',
    }),
  },
  async created(){
    console.log("0.0.1")
  }
}
</script>


<style lang="stylus">
#app
  height 100vh
  font-family 'Raleway', sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  background-color #efefef
  overflow hidden

  .page-container
    height calc(100% - 64px)

  .fade-enter-active, .fade-leave-active
    transition: opacity .2s

  .fade-enter, .fade-leave-to
    opacity: 0

  .v-tooltip__content
    line-height 1.2em !important

  .load-container
    display flex
    align-items center
    justify-content center
    margin-top 8em
</style>
