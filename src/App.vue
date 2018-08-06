<template lang="pug">
#id
  v-app
    left-nav
    transition(mode="out-in" name="fade")
      navbar(v-if="$route.name != 'home'")
    transition(mode="out-in" name="fade")
      router-view.page-container
    right-nav


    create-card-modal
    create-deck-modal
</template>

<script>
import LeftNav from '@/components/LeftNav'
import RightNav from '@/components/RightNav'
import Navbar from '@/components/Navbar'
import CreateCardModal from '@/components/CreateCardModal.vue'
import CreateDeckModal from '@/components/CreateDeckModal.vue'


export default {
  name: 'app',
  components: {
    LeftNav,
    RightNav,
    Navbar,
    CreateCardModal,
    CreateDeckModal,
  },
}
</script>


<style lang="stylus">
#app
  height 100vh
  font-family 'Avenir', Helvetica, Arial, sans-serif
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

</style>
